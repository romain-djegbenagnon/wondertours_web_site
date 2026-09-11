import { describe, expect, test } from "bun:test";
import { prisma } from "@/lib/db";
import { slugify, uniqueSlug } from "@/lib/slug";
import { uniquePrefix } from "./helpers";

describe("slugify", () => {
  test("retire accents, ponctuation et espaces", () => {
    // L'apostrophe est supprimée sans tiret (d'Ouidah → douidah).
    expect(slugify("Découverte d'Ouidah & Ganvié !")).toBe(
      "decouverte-douidah-ganvie"
    );
  });

  test("tronque à 200 caractères", () => {
    expect(slugify("a".repeat(300)).length).toBeLessThanOrEqual(200);
  });

  test("chaîne vide → slug vide", () => {
    expect(slugify("!!!")).toBe("");
  });
});

describe("uniqueSlug", () => {
  test("retourne le slug de base s'il est libre", async () => {
    const title = uniquePrefix("libre");
    const slug = await uniqueSlug("circuit", title);
    expect(slug).toBe(slugify(title));
  });

  test("suffixe numérique en cas de collision", async () => {
    const title = uniquePrefix("colis");
    // Créer un circuit porteur du slug de base.
    const existing = await prisma.circuit.create({
      data: { title, slug: slugify(title), price: 1000, durationDays: 1 },
    });
    try {
      const slug = await uniqueSlug("circuit", title);
      expect(slug).toBe(`${slugify(title)}-2`);
    } finally {
      await prisma.circuit.delete({ where: { id: existing.id } });
    }
  });

  test("excludeId ignore la ligne courante (PATCH)", async () => {
    const title = uniquePrefix("excl");
    const circuit = await prisma.circuit.create({
      data: { title, slug: slugify(title), price: 1000, durationDays: 1 },
    });
    try {
      const slug = await uniqueSlug("circuit", title, circuit.id);
      expect(slug).toBe(slugify(title));
    } finally {
      await prisma.circuit.delete({ where: { id: circuit.id } });
    }
  });
});
