import {
  ok,
  created,
  parseBody,
  parseQuery,
  handleProtectedRoute,
} from "@/lib/api/utils";
import {
  listQuerySchema,
  blogCategoryCreateSchema,
} from "@/lib/api/schemas";
import {
  listBlogCategories,
  createBlogCategory,
} from "@/lib/services/blog";
import { uniqueSlug } from "@/lib/slug";

export async function GET(request: Request) {
  return handleProtectedRoute(request, async (_session) => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listBlogCategories({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
    });
    return ok(result);
  });
}

export async function POST(request: Request) {
  return handleProtectedRoute(request, async (_session) => {
    const [body, errorResponse] = await parseBody(
      request,
      blogCategoryCreateSchema
    );
    if (errorResponse) return errorResponse;

    const category = await createBlogCategory({
      slug: await uniqueSlug("blogCategory", body.name),
      name: body.name,
      nameEn: body.nameEn ?? null,
      description: body.description ?? null,
      color: body.color ?? null,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    });

    return created(category);
  }, { roles: ["admin", "editor"] });
}
