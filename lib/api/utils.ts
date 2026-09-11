import { z } from "zod";

// ─────────────────────────────── Schémas partagés ───────────────────────────────

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().min(1).optional(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const uuidSchema = z.string().uuid();

// ─────────────────────────────── Réponses JSON ───────────────────────────────

/** JSON.stringify n'accepte pas BigInt (ex: MediaFile.size) : sérialiser en chaîne. */
function jsonStringify(data: unknown): string {
  return JSON.stringify(data, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

function jsonResponse(data: unknown, init: ResponseInit): Response {
  return new Response(jsonStringify(data), {
    ...init,
    headers: { "Content-Type": "application/json; charset=utf-8", ...init.headers },
  });
}

export function ok<T>(data: T, init?: ResponseInit): Response {
  return jsonResponse(data, { status: 200, ...init });
}

export function created<T>(data: T): Response {
  return jsonResponse(data, { status: 201 });
}

export function badRequest(message: string, details?: unknown): Response {
  return jsonResponse({ error: message, ...(details ? { details } : {}) }, { status: 400 });
}

export function notFound(message = "Ressource introuvable"): Response {
  return jsonResponse({ error: message }, { status: 404 });
}

export function conflict(message: string): Response {
  return jsonResponse({ error: message }, { status: 409 });
}

export function serverError(message = "Erreur interne du serveur"): Response {
  return jsonResponse({ error: message }, { status: 500 });
}

// ─────────────────────────────── Parsing ───────────────────────────────

/** Résultat de parsing : succès [data, null] ou échec [null, Response]. */
export type ParseResult<T> =
  | [data: T, error: null]
  | [data: null, error: Response];

/** Parse et valide le corps JSON d'une requête. Retourne [data, response] — si data est null, renvoyer la response. */
export async function parseBody<S extends z.ZodType>(
  request: Request,
  schema: S
): Promise<ParseResult<z.infer<S>>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return [null, badRequest("Corps JSON invalide")];
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    return [null, badRequest("Données invalides", result.error.issues)];
  }
  return [result.data, null];
}

/** Parse et valide les query params d'une requête. */
export function parseQuery<S extends z.ZodType>(
  request: Request,
  schema: S
): ParseResult<z.infer<S>> {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  const result = schema.safeParse(params);
  if (!result.success) {
    return [null, badRequest("Paramètres invalides", result.error.issues)];
  }
  return [result.data, null];
}

// ─────────────────────────────── Gestion d'erreurs ───────────────────────────────

/** Erreurs Prisma connues → réponse HTTP appropriée. */
export function prismaErrorResponse(error: unknown): Response | null {
  const err = error as { code?: string; meta?: { target?: string[] } };
  if (err?.code === "P2002") {
    const target = err.meta?.target?.join(", ") ?? "champ unique";
    return conflict(`Contrainte d'unicité violée (${target})`);
  }
  if (err?.code === "P2025") {
    return notFound();
  }
  if (err?.code === "P2003") {
    return badRequest("Référence invalide (clé étrangère)");
  }
  return null;
}

/** Enveloppe un handler : capture les erreurs Prisma et renvoie des réponses cohérentes. */
export async function handleRoute(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (error) {
    const prismaResponse = prismaErrorResponse(error);
    if (prismaResponse) return prismaResponse;
    console.error("[api]", error);
    return serverError();
  }
}
