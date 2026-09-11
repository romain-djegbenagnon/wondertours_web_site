import { ok, notFound, handleRoute } from "@/lib/api/utils";
import { getBlogPostBySlug, incrementBlogPostViews } from "@/lib/services/blog";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/blog/[slug]'>
) {
  return handleRoute(async () => {
    const { slug } = await ctx.params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return notFound("Article introuvable");
    // Compteur de vues asynchrone, sans bloquer la réponse.
    void incrementBlogPostViews(post.id).catch(() => {});
    return ok(post);
  });
}
