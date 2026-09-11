import { describe, expect, test } from "bun:test";
import {
  listServices,
  createService,
  updateService,
  deleteService,
} from "@/lib/services/services";
import { uniquePrefix } from "./helpers";

describe("services (à la carte)", () => {
  test("CRUD complet", async () => {
    const title = uniquePrefix("Service");

    const service = await createService({
      title,
      description: "Description du service de test.",
      icon: "star",
      sortOrder: 99,
    });

    try {
      expect((await listServices({ q: title })).total).toBe(1);

      const updated = await updateService(service.id, {
        description: "Description mise à jour.",
        isActive: false,
      });
      expect(updated.isActive).toBe(false);
      expect((await listServices({ q: title, active: true })).total).toBe(0);
    } finally {
      await deleteService(service.id);
    }
  });
});
