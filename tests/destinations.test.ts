import { describe, expect, test } from "bun:test";
import {
  listDestinations,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} from "@/lib/services/destinations";
import { slugify } from "@/lib/slug";
import { uniquePrefix } from "./helpers";

describe("destinations", () => {
  test("CRUD complet + filtre actif", async () => {
    const name = uniquePrefix("Destination");
    const slug = slugify(name);

    let destination = await createDestination({
      name,
      slug,
      country: "Bénin",
      isActive: false,
    });

    try {
      // Slug public : inactif exclu
      expect(await getDestinationBySlug(slug)).toBeNull();

      // LIST : visible sans filtre (dashboard), invisible avec active=true
      expect((await listDestinations({ q: name })).total).toBe(1);
      expect((await listDestinations({ q: name, active: true })).total).toBe(0);

      // UPDATE : activation
      destination = await updateDestination(destination.id, {
        isActive: true,
        region: "Atlantique",
      });
      expect(destination.isActive).toBe(true);
      expect((await getDestinationBySlug(slug))?.region).toBe("Atlantique");
    } finally {
      await deleteDestination(destination.id);
    }
  });
});
