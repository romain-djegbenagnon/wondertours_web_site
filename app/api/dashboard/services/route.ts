import {
  ok,
  created,
  parseBody,
  parseQuery,
  handleRoute,
} from "@/lib/api/utils";
import { listQuerySchema, serviceCreateSchema } from "@/lib/api/schemas";
import { listServices, createService } from "@/lib/services/services";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listServices({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
    });
    return ok(result);
  });
}

export async function POST(request: Request) {
  return handleRoute(async () => {
    const [body, errorResponse] = await parseBody(request, serviceCreateSchema);
    if (errorResponse) return errorResponse;

    const service = await createService({
      title: body.title,
      titleEn: body.titleEn ?? null,
      description: body.description ?? null,
      descriptionEn: body.descriptionEn ?? null,
      icon: body.icon ?? null,
      href: body.href ?? null,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    });

    return created(service);
  });
}
