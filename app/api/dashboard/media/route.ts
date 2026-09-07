import { ok, created, badRequest, parseQuery, handleRoute } from "@/lib/api/utils";
import { listQuerySchema } from "@/lib/api/schemas";
import {
  listMediaFiles,
  uploadMedia,
  MediaValidationError,
} from "@/lib/services/media";

export async function GET(request: Request) {
  return handleRoute(async () => {
    const [query, errorResponse] = parseQuery(request, listQuerySchema);
    if (errorResponse) return errorResponse;

    const result = await listMediaFiles({
      page: query.page,
      pageSize: query.pageSize,
      q: query.q,
    });
    return ok(result);
  });
}

export async function POST(request: Request) {
  return handleRoute(async () => {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return badRequest("Corps multipart/form-data attendu");
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return badRequest("Champ 'file' manquant ou invalide");
    }

    const altText = formData.get("altText");
    const altTextEn = formData.get("altTextEn");

    try {
      const media = await uploadMedia({
        file,
        altText: typeof altText === "string" && altText ? altText : null,
        altTextEn: typeof altTextEn === "string" && altTextEn ? altTextEn : null,
      });
      // BigInt (size) n'est pas sérialisable en JSON par défaut.
      return created({
        ...media,
        size: media.size ? media.size.toString() : null,
      });
    } catch (error) {
      if (error instanceof MediaValidationError) {
        return badRequest(error.message);
      }
      throw error;
    }
  });
}
