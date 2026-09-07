import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { blogCategoryUpdateSchema } from "@/lib/api/schemas";
import {
  updateBlogCategory,
  deleteBlogCategory,
} from "@/lib/services/blog";
import { prisma } from "@/lib/db";
import { uniqueSlug } from "@/lib/slug";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/blog-categories/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Catégorie introuvable");
    const category = await prisma.blogCategory.findUnique({ where: { id } });
    if (!category) return notFound("Catégorie introuvable");
    return ok(category);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/blog-categories/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Catégorie introuvable");

    const [body, errorResponse] = await parseBody(
      request,
      blogCategoryUpdateSchema
    );
    if (errorResponse) return errorResponse;

    const updates: Record<string, unknown> = { ...body };
    if (body.name) {
      updates.slug = await uniqueSlug("blogCategory", body.name, id);
    }

    try {
      const category = await updateBlogCategory(id, updates);
      return ok(category);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/blog-categories/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Catégorie introuvable");

    try {
      await deleteBlogCategory(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Catégorie supprimée", id });
  });
}
