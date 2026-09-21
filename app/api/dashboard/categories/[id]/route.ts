import {
  ok,
  notFound,
  parseBody,
  handleProtectedRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { categoryUpdateSchema } from "@/lib/api/schemas";
import {
  updateCategory,
  deleteCategory,
} from "@/lib/services/categories";
import { prisma } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function GET(
  request: Request,
  ctx: RouteContext<'/api/dashboard/categories/[id]'>
) {
  return handleProtectedRoute(request, async (_session) => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Catégorie introuvable");
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return notFound("Catégorie introuvable");
    return ok(category);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/categories/[id]'>
) {
  return handleProtectedRoute(request, async (_session) => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Catégorie introuvable");

    const [body, errorResponse] = await parseBody(request, categoryUpdateSchema);
    if (errorResponse) return errorResponse;

    const updates: Record<string, unknown> = { ...body };
    if (body.name) {
      updates.slug = await uniqueSlug("category", body.name, id);
    }

    try {
      const category = await updateCategory(id, updates);
      return ok(category);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  }, { roles: ["admin", "editor"] });
}

export async function DELETE(
  request: Request,
  ctx: RouteContext<'/api/dashboard/categories/[id]'>
) {
  return handleProtectedRoute(request, async (_session) => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Catégorie introuvable");

    try {
      await deleteCategory(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Catégorie supprimée", id });
  }, { roles: ["admin", "editor"] });
}
