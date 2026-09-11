import {
  ok,
  notFound,
  handleRoute,
  uuidSchema,
  prismaErrorResponse,
} from "@/lib/api/utils";
import { deleteMediaFile, MediaValidationError } from "@/lib/services/media";

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/media/[id]'>
) {
  return handleRoute(async () => {
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
  });
}
