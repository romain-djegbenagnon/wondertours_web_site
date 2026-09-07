/**
 * Helpers partagés par les composants clients du dashboard pour interpréter
 * les réponses d'erreur de l'API, au format { error, details? }.
 */

/** Formate la réponse d'erreur API {error, details?} en message lisible. */
export async function readApiError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as {
      error?: string;
      details?: { message?: string }[];
    };
    if (data.error) {
      const details = data.details?.map((d) => d.message).filter(Boolean);
      return details?.length ? `${data.error} : ${details.join(", ")}` : data.error;
    }
  } catch {
    // réponse non JSON
  }
  return `Erreur ${response.status}`;
}
