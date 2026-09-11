import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { serviceUpdateSchema } from "@/lib/api/schemas";
import { updateService, deleteService } from "@/lib/services/services";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/services/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Service introuvable");
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return notFound("Service introuvable");
    return ok(service);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/services/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Service introuvable");

    const [body, errorResponse] = await parseBody(request, serviceUpdateSchema);
    if (errorResponse) return errorResponse;

    try {
      const service = await updateService(id, body);
      return ok(service);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/services/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Service introuvable");

    try {
      await deleteService(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Service supprimé", id });
  });
}
