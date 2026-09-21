/**
 * Client imgBB — stockage d'images distant (https://api.imgbb.com).
 *
 * La clé `IMGBB_API_KEY` est résolue paresseusement (à chaque appel) : sans
 * clé, la médiathèque retombe sur le stockage local (lib/services/media.ts).
 * En production (Vercel, FS en lecture seule), la clé rend les uploads
 * persistants.
 *
 * ⚠️ imgBB n'expose pas d'API de suppression : le `delete_url` renvoyé à
 * l'upload est une page à visiter manuellement. Il est conservé en base
 * (colonne `storagePath`) à titre de référence.
 */

const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

/** Échec de l'upload imgBB (réseau, clé invalide, réponse inattendue). */
export class ImgbbUploadError extends Error {}

/** Vrai si `IMGBB_API_KEY` est définie (stockage distant actif). */
export function isImgbbConfigured(): boolean {
  return Boolean(process.env.IMGBB_API_KEY);
}

export interface ImgbbUploadResult {
  /** URL directe de l'image (à utiliser comme source d'affichage). */
  url: string;
  /** Page de suppression manuelle imgBB (pas d'API de suppression). */
  deleteUrl: string;
}

interface ImgbbResponse {
  success?: boolean;
  data?: {
    display_url?: string;
    image?: { url?: string };
    delete_url?: string;
  };
  error?: { message?: string };
}

/** Téléverse le fichier sur imgBB et renvoie les URL d'accès/suppression. */
export async function uploadToImgbb(file: File): Promise<ImgbbUploadResult> {
  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    throw new ImgbbUploadError("IMGBB_API_KEY non configurée");
  }

  const form = new FormData();
  form.append("key", apiKey);
  form.append("image", file);

  let response: Response;
  try {
    response = await fetch(IMGBB_API_URL, { method: "POST", body: form });
  } catch (error) {
    throw new ImgbbUploadError(
      `Échec de la requête imgBB : ${(error as Error).message}`
    );
  }

  let body: ImgbbResponse;
  try {
    body = (await response.json()) as ImgbbResponse;
  } catch {
    throw new ImgbbUploadError(
      `Réponse imgBB illisible (HTTP ${response.status})`
    );
  }

  if (!response.ok || !body.success) {
    throw new ImgbbUploadError(
      `imgBB a refusé l'upload : ${body.error?.message ?? `HTTP ${response.status}`}`
    );
  }

  const url = body.data?.display_url ?? body.data?.image?.url;
  const deleteUrl = body.data?.delete_url;
  if (!url || !deleteUrl) {
    throw new ImgbbUploadError(
      "Réponse imgBB incomplète (url ou delete_url manquante)"
    );
  }

  return { url, deleteUrl };
}
