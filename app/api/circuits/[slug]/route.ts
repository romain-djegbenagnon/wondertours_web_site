import { ok, notFound, handleRoute } from "@/lib/api/utils";
import { getCircuitBySlug } from "@/lib/services/circuits";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/circuits/[slug]'>
) {
  return handleRoute(async () => {
    const { slug } = await ctx.params;
    const circuit = await getCircuitBySlug(slug);
    if (!circuit) return notFound("Circuit introuvable");
    return ok(circuit);
  });
}
