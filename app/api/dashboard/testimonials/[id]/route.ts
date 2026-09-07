import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { testimonialUpdateSchema } from "@/lib/api/schemas";
import {
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/services/testimonials";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/testimonials/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Témoignage introuvable");
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) return notFound("Témoignage introuvable");
    return ok(testimonial);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/testimonials/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Témoignage introuvable");

    const [body, errorResponse] = await parseBody(
      request,
      testimonialUpdateSchema
    );
    if (errorResponse) return errorResponse;

    const updates: Record<string, unknown> = { ...body };
    if (body.date !== undefined) {
      updates.date = body.date ? new Date(body.date) : null;
    }

    try {
      const testimonial = await updateTestimonial(id, updates);
      return ok(testimonial);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/testimonials/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Témoignage introuvable");

    try {
      await deleteTestimonial(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Témoignage supprimé", id });
  });
}
