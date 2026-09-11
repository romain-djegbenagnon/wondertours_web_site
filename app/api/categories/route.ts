import { z } from "zod";
import { ok, parseQuery, handleRoute } from "@/lib/api/utils";
import { listCategories } from "@/lib/services/categories";

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).optional(),
});

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, querySchema);
    if (errorResponse) return errorResponse;

    const result = await listCategories({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
      active: true,
    });
    return ok(result);
  });
}
