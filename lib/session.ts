import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  toSession,
  verifySessionToken,
  type Session,
} from "@/lib/auth";

/**
 * Session pour les Server Components (layout, pages) : lit le cookie
 * `wt_session` via cookies() — asynchrone en Next 16.
 * Retourne null si absente/invalide ; le contrôle de forme du payload
 * est délégué à `toSession` (lib/auth.ts).
 *
 * ⚠️ À n'utiliser que dans les Server Components / Server Functions —
 * pas dans proxy.ts (runtime distinct) ni les route handlers, qui
 * disposent de `getSessionFromRequest` (lib/api/utils.ts).
 */
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  return toSession(await verifySessionToken(token));
}
