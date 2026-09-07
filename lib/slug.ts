import { prisma } from "@/lib/db";

/** Convertit un titre en slug URL (ASCII, minuscules, tirets). */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

type SlugTable =
  | "circuit"
  | "destination"
  | "category"
  | "blogPost"
  | "blogCategory";

/**
 * Génère un slug unique : ajoute un suffixe numérique (-2, -3…) si le slug
 * de base existe déjà en base pour le modèle donné.
 */
export async function uniqueSlug(
  table: SlugTable,
  title: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(title);
  if (!base) {
    throw new Error("Impossible de générer un slug à partir d'un titre vide");
  }

  const exists = async (slug: string): Promise<boolean> => {
    switch (table) {
      case "circuit":
        return !!(await prisma.circuit.findFirst({
          where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
          select: { id: true },
        }));
      case "destination":
        return !!(await prisma.destination.findFirst({
          where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
          select: { id: true },
        }));
      case "category":
        return !!(await prisma.category.findFirst({
          where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
          select: { id: true },
        }));
      case "blogPost":
        return !!(await prisma.blogPost.findFirst({
          where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
          select: { id: true },
        }));
      case "blogCategory":
        return !!(await prisma.blogCategory.findFirst({
          where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
          select: { id: true },
        }));
    }
  };

  let slug = base;
  let suffix = 2;
  while (await exists(slug)) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}
