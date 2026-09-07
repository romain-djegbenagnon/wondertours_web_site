import { z } from "zod";
import { ok, parseQuery, handleRoute } from "@/lib/api/utils";
import { listBlogPosts } from "@/lib/services/blog";

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).optional(),
  category: z.string().trim().min(1).optional(),
  featured: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, querySchema);
    if (errorResponse) return errorResponse;

    const result = await listBlogPosts({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
      published: true,
      categorySlug: query.category,
      featured: query.featured,
    });
    return ok(result);
  });
}
