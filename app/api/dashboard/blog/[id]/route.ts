import {
  ok,
  notFound,
  parseBody,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { blogPostUpdateSchema } from "@/lib/api/schemas";
import {
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/services/blog";
import { uniqueSlug } from "@/lib/slug";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/blog/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Article introuvable");
    const post = await getBlogPostById(id);
    if (!post) return notFound("Article introuvable");
    return ok(post);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/blog/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Article introuvable");

    const [body, errorResponse] = await parseBody(request, blogPostUpdateSchema);
    if (errorResponse) return errorResponse;

    const existing = await getBlogPostById(id);
    if (!existing) return notFound("Article introuvable");

    const updates: Record<string, unknown> = { ...body };
    if (body.title) {
      updates.slug = await uniqueSlug("blogPost", body.title, id);
    }
    // Première publication → dater ; dépublication → garder la date.
    if (body.isPublished === true && !existing.publishedAt) {
      updates.publishedAt = new Date();
    }

    try {
      const post = await updateBlogPost(id, updates);
      return ok(post);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/blog/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Article introuvable");

    try {
      await deleteBlogPost(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Article supprimé", id });
  });
}
