import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { destinationUpdateSchema } from "@/lib/api/schemas";
import {
  updateDestination,
  deleteDestination,
} from "@/lib/services/destinations";
import { prisma } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/destinations/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Destination introuvable");
    const destination = await prisma.destination.findUnique({ where: { id } });
    if (!destination) return notFound("Destination introuvable");
    return ok(destination);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/destinations/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Destination introuvable");

    const [body, errorResponse] = await parseBody(
      request,
      destinationUpdateSchema
    );
    if (errorResponse) return errorResponse;

    const updates: Record<string, unknown> = { ...body };
    if (body.name) {
      updates.slug = await uniqueSlug("destination", body.name, id);
    }

    try {
      const destination = await updateDestination(id, updates);
      return ok(destination);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/destinations/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Destination introuvable");

    try {
      await deleteDestination(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Destination supprimée", id });
  });
}
