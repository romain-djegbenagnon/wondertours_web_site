import {
  ok,
  notFound,
  handleProtectedRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { deleteMediaFile, MediaValidationError } from "@/lib/services/media";

export async function DELETE(
  request: Request,
  ctx: RouteContext<'/api/dashboard/media/[id]'>
) {
  return handleProtectedRoute(request, async (_session) => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Fichier introuvable");

    try {
      const media = await deleteMediaFile(id);
      return ok({
        message: "Fichier supprimé",
        id,
        url: media.url,
      });
    } catch (error) {
      if (error instanceof MediaValidationError) {
        return notFound(error.message);
      }
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  }, { roles: ["admin", "editor"] });
}
