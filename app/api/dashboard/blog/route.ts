import {
  ok,
  created,
  parseBody,
  parseQuery,
  handleRoute,
} from "@/lib/api/utils";
import { listQuerySchema, blogPostCreateSchema } from "@/lib/api/schemas";
import { listBlogPosts, createBlogPost } from "@/lib/services/blog";
import { uniqueSlug } from "@/lib/slug";
import { DbNull } from "@/lib/db";

/** Champ Json : null → DbNull (convention Prisma 7). */
function json<T>(value: T | null | undefined): T | typeof DbNull {
  return (value ?? DbNull) as T | typeof DbNull;
}

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listBlogPosts({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
    });
    return ok(result);
  });
}

export async function POST(request: Request) {
  return handleRoute(async () => {
    const [body, errorResponse] = await parseBody(
      request,
      blogPostCreateSchema
    );
    if (errorResponse) return errorResponse;

    const post = await createBlogPost({
      slug: await uniqueSlug("blogPost", body.title),
      title: body.title,
      titleEn: body.titleEn ?? null,
      excerpt: body.excerpt ?? null,
      excerptEn: body.excerptEn ?? null,
      content: body.content ?? null,
      contentEn: body.contentEn ?? null,
      categoryId: body.categoryId ?? null,
      imageUrl: body.imageUrl ?? null,
      tags: json(body.tags),
      readTime: body.readTime ?? null,
      isFeatured: body.isFeatured,
      isPublished: body.isPublished,
      // À la première publication, dater l'article.
      ...(body.isPublished ? { publishedAt: new Date() } : {}),
    });

    return created(post);
  });
}
