import { describe, expect, test } from "bun:test";
import {
  listBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  incrementBlogPostViews,
  listBlogCategories,
  createBlogCategory,
  deleteBlogCategory,
} from "@/lib/services/blog";
import { slugify } from "@/lib/slug";
import { uniquePrefix } from "./helpers";

describe("blog", () => {
  test("CRUD article + publication + vues", async () => {
    const title = uniquePrefix("Article");
    const slug = slugify(title);

    let post = await createBlogPost({
      title,
      slug,
      excerpt: "Résumé de test.",
      content: "Contenu de test suffisamment long.",
      isPublished: false,
    });

    try {
      // Non publié : invisible par défaut, visible côté dashboard
      expect(await getBlogPostBySlug(slug)).toBeNull();
      expect((await listBlogPosts({ q: title })).total).toBe(1);
      expect((await listBlogPosts({ q: title, published: true })).total).toBe(0);

      // Publication + date de publication
      post = await updateBlogPost(post.id, {
        isPublished: true,
        publishedAt: new Date(),
      });
      expect(await getBlogPostBySlug(slug)).not.toBeNull();

      // Incrément de vues
      expect(post.views).toBe(0);
      await incrementBlogPostViews(post.id);
      post = (await getBlogPostBySlug(slug, true))!;
      expect(post.views).toBe(1);
    } finally {
      await deleteBlogPost(post.id);
    }
  });

  test("CRUD catégorie blog", async () => {
    const name = uniquePrefix("BlogCat");
    const category = await createBlogCategory({
      name,
      slug: slugify(name),
      sortOrder: 7,
    });
    try {
      expect((await listBlogCategories({ q: name })).total).toBe(1);
      expect((await listBlogCategories({ q: name, active: true })).total).toBe(1);
    } finally {
      await deleteBlogCategory(category.id);
    }
  });
});
