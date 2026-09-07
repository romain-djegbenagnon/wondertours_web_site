import { describe, expect, test } from "bun:test";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/services/categories";
import { slugify } from "@/lib/slug";
import { uniquePrefix } from "./helpers";

describe("categories", () => {
  test("CRUD complet + tri sortOrder", async () => {
    const name = uniquePrefix("Catégorie");

    const category = await createCategory({
      name,
      slug: slugify(name),
      icon: "compass",
      sortOrder: 42,
    });

    try {
      expect((await listCategories({ q: name })).total).toBe(1);

      const updated = await updateCategory(category.id, {
        name: `${name} Maj`,
        icon: "map",
        isActive: false,
      });
      expect(updated.icon).toBe("map");
      expect(updated.isActive).toBe(false);
      // q est une recherche par sous-chaîne : "name" matche aussi "name Maj".
      const found = await listCategories({ q: name });
      expect(found.total).toBe(1);
      expect(found.items[0].name).toBe(`${name} Maj`);
    } finally {
      await deleteCategory(category.id);
    }
  });
});
