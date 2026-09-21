import { z } from "zod";
import {
  ok,
  parseBody,
  handleProtectedRoute,
  serviceUnavailable,
} from "@/lib/api/utils";
import { isDeepLConfigured, translateTexts } from "@/lib/services/deepl";

/**
 * POST /api/dashboard/translate
 * Traduction DeepL de textes du dashboard (bouton « Traduire en anglais »
 * des formulaires). Admin + éditeur uniquement.
 *
 * - 400 : corps invalide (texts vide, > 20 entrées, valeur vide > 100 000 car.) ;
 * - 401/403 : session absente / rôle insuffisant ;
 * - 503 : DEEPL_API_KEY absente.
 */
const translateSchema = z.object({
  // Clés libres (noms de champs du formulaire appelant) → textes à traduire.
  texts: z
    .record(
      z.string().trim().min(1).max(100),
      z.string().trim().min(1).max(100000)
    )
    .refine((texts) => Object.keys(texts).length > 0, {
      message: "Au moins un texte à traduire est requis",
    })
    .refine((texts) => Object.keys(texts).length <= 20, {
      message: "20 textes maximum par requête",
    }),
  sourceLocale: z.enum(["fr", "en"]).optional(),
  targetLocale: z.enum(["fr", "en"]),
});

/**
 * Codes DeepL : l'anglais **cible** se précise en `en-US` ; en source,
 * deepl-node n'accepte pas les variantes régionales — la source reste `en`.
 */
function toDeeplTarget(locale: "fr" | "en"): "en-US" | "fr" {
  return locale === "en" ? "en-US" : "fr";
}

export async function POST(request: Request) {
  return handleProtectedRoute(
    request,
    async (_session) => {
      const [body, errorResponse] = await parseBody(request, translateSchema);
      if (errorResponse) return errorResponse;

      if (!isDeepLConfigured()) {
        return serviceUnavailable(
          "DeepL n'est pas configuré : définissez DEEPL_API_KEY (serveur)"
        );
      }

      const keys = Object.keys(body.texts);
      const translated = await translateTexts(
        keys.map((key) => body.texts[key]),
        toDeeplTarget(body.targetLocale),
        body.sourceLocale
      );

      const texts = Object.fromEntries(
        keys.map((key, index) => [key, translated[index]])
      );
      return ok({ texts, targetLocale: body.targetLocale });
    },
    { roles: ["admin", "editor"] }
  );
}
