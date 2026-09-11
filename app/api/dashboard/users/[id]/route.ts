import { z } from "zod";
import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { getUserById, updateUser, deleteUser } from "@/lib/services/users";

const updateSchema = z.object({
  email: z.string().trim().email().max(255).optional(),
  password: z.string().min(8).max(100).optional(),
  firstName: z.string().trim().min(1).max(100).optional(),
  lastName: z.string().trim().min(1).max(100).optional(),
  role: z.enum(["admin", "editor", "viewer"]).optional(),
  isActive: z.coerce.boolean().optional(),
});

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/users/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Utilisateur introuvable");
    const user = await getUserById(id);
    if (!user) return notFound("Utilisateur introuvable");
    return ok(user);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/users/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Utilisateur introuvable");

    const [body, errorResponse] = await parseBody(request, updateSchema);
    if (errorResponse) return errorResponse;

    try {
      const user = await updateUser(id, body);
      return ok(user);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/users/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Utilisateur introuvable");

    try {
      await deleteUser(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Utilisateur supprimé", id });
  });
}
