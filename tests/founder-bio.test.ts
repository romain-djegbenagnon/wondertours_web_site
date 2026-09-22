import { beforeAll, afterAll, describe, expect, test } from "bun:test";
import { getSetting, upsertSettings } from "@/lib/services/settings";
import { prisma } from "@/lib/db";

/**
 * Biographie du fondateur (page /a-propos).
 * Parcours complet de la feature :
 *   1. sauvegarde dashboard — upsertSettings, le même service que
 *      PUT /api/dashboard/settings ;
 *   2. lecture page — getSetting + la transformation de app/a-propos/page.tsx
 *      (`?.trim() || null`), ce qui décide rendu de la bio vs repli statique.
 * Les clés founder_bio_* ne sont pas créées par le seed : l'état initial est
 * restauré après les tests (suppression si la clé n'existait pas).
 */

const KEYS = ["founder_bio_fr", "founder_bio_en"] as const;

/** Transformation appliquée par app/a-propos/page.tsx avant rendu. */
function pageTransform(value: string | null): string | null {
  return value?.trim() || null;
}

describe("biographie du fondateur (founder_bio_fr / founder_bio_en)", () => {
  const originals = new Map<string, { existed: boolean; value: string | null }>();

  beforeAll(async () => {
    for (const key of KEYS) {
      const existing = await prisma.setting.findUnique({ where: { key } });
      originals.set(key, {
        existed: existing !== null,
        value: existing?.value ?? null,
      });
    }
  });

  afterAll(async () => {
    for (const key of KEYS) {
      const original = originals.get(key);
      if (original?.existed) {
        await prisma.setting.update({
          where: { key },
          data: { value: original.value },
        });
      } else {
        await prisma.setting.deleteMany({ where: { key } });
      }
    }
  });

  test("sauvegarde dashboard → lecture page (sauts de ligne conservés)", async () => {
    const bioFr = "Guide depuis 20 ans.\nPassionné par le patrimoine béninois.";
    const bioEn = "Guide for 20 years.\nPassionate about Beninese heritage.";

    // Ce que le formulaire dashboard envoie au PUT groupé.
    await upsertSettings([
      { key: "founder_bio_fr", value: bioFr },
      { key: "founder_bio_en", value: bioEn },
    ]);

    // Ce que la page lit puis transmet au composant (bio rendue).
    expect(await getSetting("founder_bio_fr")).toBe(bioFr);
    expect(await getSetting("founder_bio_en")).toBe(bioEn);
    expect(pageTransform(await getSetting("founder_bio_fr"))).toBe(bioFr);
    expect(pageTransform(await getSetting("founder_bio_en"))).toBe(bioEn);
  });

  test("mise à jour (écrasement) de la valeur existante", async () => {
    await upsertSettings([
      { key: "founder_bio_fr", value: "Nouvelle bio FR" },
    ]);
    expect(await getSetting("founder_bio_fr")).toBe("Nouvelle bio FR");
  });

  test("valeur vide (null) → repli sur le texte statique", async () => {
    // Le formulaire dashboard envoie null pour un champ vidé.
    await upsertSettings([
      { key: "founder_bio_fr", value: null },
      { key: "founder_bio_en", value: null },
    ]);
    expect(await getSetting("founder_bio_fr")).toBeNull();
    expect(pageTransform(await getSetting("founder_bio_fr"))).toBeNull();
    expect(pageTransform(await getSetting("founder_bio_en"))).toBeNull();
  });

  test("valeur blank (espaces) → repli grâce au trim côté page", async () => {
    await upsertSettings([{ key: "founder_bio_fr", value: "   " }]);
    expect(await getSetting("founder_bio_fr")).toBe("   ");
    expect(pageTransform(await getSetting("founder_bio_fr"))).toBeNull();
  });
});
