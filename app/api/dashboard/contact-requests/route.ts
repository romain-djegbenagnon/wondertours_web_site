import { z } from "zod";
import { ok, parseQuery, handleRoute } from "@/lib/api/utils";
import { listContactRequests } from "@/lib/services/contact-requests";

const querySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).optional(),
  status: z.enum(["new", "in_progress", "answered", "closed"]).optional(),
  requestType: z.enum(["circuit", "stay", "hotel", "info", "other"]).optional(),
});

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, querySchema);
    if (errorResponse) return errorResponse;

    const result = await listContactRequests({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
      status: query.status,
      requestType: query.requestType,
    });
    return ok(result);
  });
}
