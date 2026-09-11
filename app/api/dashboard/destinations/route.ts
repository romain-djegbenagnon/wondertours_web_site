import {
  ok,
  created,
  parseBody,
  parseQuery,
  handleRoute,
} from "@/lib/api/utils";
import { listQuerySchema, destinationCreateSchema } from "@/lib/api/schemas";
import {
  listDestinations,
  createDestination,
} from "@/lib/services/destinations";
import { uniqueSlug } from "@/lib/slug";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listDestinations({
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
      destinationCreateSchema
    );
    if (errorResponse) return errorResponse;

    const destination = await createDestination({
      slug: await uniqueSlug("destination", body.name),
      name: body.name,
      nameEn: body.nameEn ?? null,
      description: body.description ?? null,
      descriptionEn: body.descriptionEn ?? null,
      imageUrl: body.imageUrl ?? null,
      country: body.country ?? null,
      region: body.region ?? null,
      isActive: body.isActive,
    });

    return created(destination);
  });
}
