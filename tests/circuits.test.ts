import { describe, expect, test } from "bun:test";
import { prisma } from "@/lib/db";
import {
  listCircuits,
  getCircuitBySlug,
  createCircuit,
  updateCircuit,
  deleteCircuit,
} from "@/lib/services/circuits";
import { uniquePrefix } from "./helpers";

describe("circuits", () => {
  test("CRUD complet + filtres", async () => {
    const title = uniquePrefix("Circuit");
    const price = 25000;

    // CREATE (via service direct, slug calculé par l'appelant comme la route)
    let circuit = await createCircuit({
      title,
      slug: uniquePrefix("circuit"),
      price,
      durationDays: 3,
      currency: "XOF",
      isActive: false,
      highlights: ["Journée 1", "Journée 2"],
      itinerary: [{ day: 1, title: "Arrivée" }],
    });
    expect(circuit.id).toBeDefined();
    expect(circuit.isActive).toBe(false);

    try {
      // GET par slug : inactif exclu par défaut, inclus avec includeInactive
      expect(await getCircuitBySlug(circuit.slug)).toBeNull();
      expect(await getCircuitBySlug(circuit.slug, true)).not.toBeNull();

      // LIST : total inclut les inactifs (dashboard), filtre active=true les exclut
      const all = await listCircuits({ q: title });
      expect(all.total).toBe(1);
      const activeOnly = await listCircuits({ q: title, active: true });
      expect(activeOnly.total).toBe(0);

      // UPDATE : prix + activation
      circuit = await updateCircuit(circuit.id, {
        price: 30000,
        isActive: true,
      });
      expect(Number(circuit.price)).toBe(30000);
      expect(await getCircuitBySlug(circuit.slug)).not.toBeNull();

      // Filtres prix/durée
      const byPrice = await listCircuits({ q: title, maxPrice: 29999 });
      expect(byPrice.total).toBe(0);
      const byDuration = await listCircuits({ q: title, maxDuration: 3 });
      expect(byDuration.total).toBe(1);
    } finally {
      await deleteCircuit(circuit.id);
    }

    expect(await prisma.circuit.findUnique({ where: { id: circuit.id } })).toBeNull();
  });
});
