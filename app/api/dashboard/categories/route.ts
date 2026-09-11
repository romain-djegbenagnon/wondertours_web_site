import {
  ok,
  created,
  parseBody,
  parseQuery,
  handleRoute,
} from "@/lib/api/utils";
import { listQuerySchema, categoryCreateSchema } from "@/lib/api/schemas";
import { listCategories, createCategory } from "@/lib/services/categories";
import { uniqueSlug } from "@/lib/slug";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listCategories({
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
      categoryCreateSchema
    );
    if (errorResponse) return errorResponse;

    const category = await createCategory({
      slug: await uniqueSlug("category", body.name),
      name: body.name,
      nameEn: body.nameEn ?? null,
      description: body.description ?? null,
      descriptionEn: body.descriptionEn ?? null,
      icon: body.icon ?? null,
      color: body.color ?? null,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    });

    return created(category);
  });
}
