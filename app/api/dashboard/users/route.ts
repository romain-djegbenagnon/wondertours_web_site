import { z } from "zod";
import { ok, created, parseBody, parseQuery, handleRoute } from "@/lib/api/utils";
import { listQuerySchema } from "@/lib/api/schemas";
import { listUsers, createUser } from "@/lib/services/users";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listUsers({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
    });
    return ok(result);
  });
}

const createSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(100),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  role: z.enum(["admin", "editor", "viewer"]).default("editor"),
  isActive: z.coerce.boolean().default(true),
});

export async function POST(request: Request) {
  return handleRoute(async () => {
    const [body, errorResponse] = await parseBody(request, createSchema);
    if (errorResponse) return errorResponse;

    const user = await createUser(body);
    return created(user);
  });
}
