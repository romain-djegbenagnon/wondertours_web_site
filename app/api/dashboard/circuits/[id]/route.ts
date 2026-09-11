import {
  ok,
  notFound,
  parseBody,
  handleRoute,
} from "@/lib/api/utils";
import { uuidSchema, prismaErrorResponse } from "@/lib/api/utils";
import { circuitUpdateSchema } from "@/lib/api/schemas";
import {
  getCircuitById,
  updateCircuit,
  deleteCircuit,
} from "@/lib/services/circuits";
import { uniqueSlug } from "@/lib/slug";

export async function GET(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/circuits/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Circuit introuvable");
    const circuit = await getCircuitById(id);
    if (!circuit) return notFound("Circuit introuvable");
    return ok(circuit);
  });
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<'/api/dashboard/circuits/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Circuit introuvable");

    const [body, errorResponse] = await parseBody(request, circuitUpdateSchema);
    if (errorResponse) return errorResponse;

    // Si le titre change, régénérer un slug unique (sauf si explicite).
    const updates: Record<string, unknown> = { ...body };
    if (body.title) {
      updates.slug = await uniqueSlug("circuit", body.title, id);
    }

    try {
      const circuit = await updateCircuit(id, updates);
      return ok(circuit);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
  });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<'/api/dashboard/circuits/[id]'>
) {
  return handleRoute(async () => {
    const { id } = await ctx.params;
    if (!uuidSchema.safeParse(id).success) return notFound("Circuit introuvable");

    const circuit = await getCircuitById(id);
    if (!circuit) return notFound("Circuit introuvable");

    try {
      await deleteCircuit(id);
    } catch (error) {
      const prismaResponse = prismaErrorResponse(error);
      if (prismaResponse) return prismaResponse;
      throw error;
    }
    return ok({ message: "Circuit supprimé", id });
  });
}
