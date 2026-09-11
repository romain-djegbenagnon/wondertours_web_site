import { z } from "zod";
import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import {
  updateContactRequestStatus,
  getContactRequestById,
} from "@/lib/services/contact-requests";

const statusSchema = z.object({
  status: z.enum(["new", "in_progress", "answered", "closed"]),
});

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/contact-requests/[id]/status'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Demande introuvable");

    const [body, errorResponse] = await parseBody(request, statusSchema);
    if (errorResponse) return errorResponse;

    const existing = await getContactRequestById(id);
    if (!existing) return notFound("Demande introuvable");

    try {
      const contactRequest = await updateContactRequestStatus(id, body.status);
      return ok(contactRequest);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}
