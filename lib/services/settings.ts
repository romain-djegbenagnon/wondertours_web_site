import { prisma, type Setting } from "@/lib/db";

/** Récupère un paramètre par sa clé. */
export async function getSetting(key: string): Promise<string | null> {
  const setting = await prisma.setting.findUnique({ where: { key } });
  return setting?.value ?? null;
}

/** Récupère tous les paramètres sous forme de map clé → valeur. */
export async function getAllSettings(): Promise<Record<string, string | null>> {
  const settings = await prisma.setting.findMany();
  return Object.fromEntries(settings.map((s) => [s.key, s.value]));
}

export async function listSettings(): Promise<Setting[]> {
  return prisma.setting.findMany({ orderBy: { key: "asc" } });
}

export interface UpsertSettingInput {
  key: string;
  value?: string | null;
  description?: string | null;
}

/** Upsert groupé de paramètres (dashboard). */
export async function upsertSettings(
  inputs: UpsertSettingInput[]
): Promise<Setting[]> {
  return prisma.$transaction(
    inputs.map((input) =>
      prisma.setting.upsert({
        where: { key: input.key },
        update: {
          value: input.value,
          ...(input.description !== undefined && {
            description: input.description,
          }),
        },
        create: {
          key: input.key,
          value: input.value,
          ...(input.description !== undefined && {
            description: input.description,
          }),
        },
      })
    )
  );
}
