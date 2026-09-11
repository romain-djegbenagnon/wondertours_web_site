import { z } from "zod";
import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { updateBookingStatus, getBookingById } from "@/lib/services/bookings";

const statusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/bookings/[id]/status'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Réservation introuvable");

    const [body, errorResponse] = await parseBody(request, statusSchema);
    if (errorResponse) return errorResponse;

    const existing = await getBookingById(id);
    if (!existing) return notFound("Réservation introuvable");

    try {
      const booking = await updateBookingStatus(id, body.status);
      return ok(booking);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}
