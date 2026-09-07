import { describe, expect, test } from "bun:test";
import {
  createContactRequest,
  getContactRequestById,
  listContactRequests,
  updateContactRequestStatus,
  deleteContactRequest,
} from "@/lib/services/contact-requests";
import {
  getSetting,
  listSettings,
  upsertSettings,
} from "@/lib/services/settings";
import { getDashboardStats } from "@/lib/services/stats";
import { uniquePrefix } from "./helpers";

describe("demandes de contact", () => {
  test("création (statut new) + changement de statut", async () => {
    const req = await createContactRequest({
      name: "Visiteur Test",
      email: `contact-${uniquePrefix("mail")}@example.com`,
      message: "Bonjour, je souhaite des informations sur vos circuits.",
      requestType: "stay",
    });

    try {
      expect((await getContactRequestById(req.id))?.status).toBe("new");
      expect((await listContactRequests({ status: "new", q: req.email })).total).toBe(1);

      const answered = await updateContactRequestStatus(req.id, "answered");
      expect(answered.status).toBe("answered");
      expect((await listContactRequests({ status: "new", q: req.email })).total).toBe(0);
    } finally {
      await deleteContactRequest(req.id);
    }
  });
});

describe("settings", () => {
  test("upsert groupe : création puis mise à jour, restauration", async () => {
    const key = uniquePrefix("test_setting");
    try {
      // Création
      await upsertSettings([{ key, value: "première valeur" }]);
      expect(await getSetting(key)).toBe("première valeur");

      // Mise à jour
      await upsertSettings([{ key, value: "seconde valeur" }]);
      expect(await getSetting(key)).toBe("seconde valeur");

      // listSettings contient la clé
      const all = await listSettings();
      expect(all.some((s) => s.key === key && s.value === "seconde valeur")).toBe(true);
    } finally {
      const { prisma } = await import("@/lib/db");
      await prisma.setting.delete({ where: { key } });
    }
  });
});

describe("stats", () => {
  test("agrégats dashboard cohérents", async () => {
    const stats = await getDashboardStats();
    expect(stats.circuits.total).toBeGreaterThanOrEqual(6);
    expect(stats.circuits.active).toBeGreaterThanOrEqual(6);
    expect(stats.circuits.featured).toBeLessThanOrEqual(stats.circuits.active);
    expect(stats.destinations.total).toBeGreaterThanOrEqual(6);
    expect(stats.bookings.revenueThisMonth).toBeGreaterThanOrEqual(0);
    expect(typeof stats.testimonials.averageRating).not.toBe("undefined");
    expect(Array.isArray(stats)).toBe(false);
  });
});
