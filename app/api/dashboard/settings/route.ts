import { z } from "zod";
import { ok, parseBody, handleProtectedRoute } from "@/lib/api/utils";
import { listSettings, upsertSettings } from "@/lib/services/settings";

export async function GET(request: Request) {
  return handleProtectedRoute(request, async (_session) => {
    const settings = await listSettings();
    return ok({ items: settings });
  });
}

const putSchema = z.object({
  settings: z
    .array(
      z.object({
        key: z.string().trim().min(1).max(100),
        value: z.string().max(10000).nullable(),
        description: z.string().max(1000).nullable().optional(),
      })
    )
    .min(1)
    .max(100),
});

export async function PUT(request: Request) {
  return handleProtectedRoute(request, async (_session) => {
    const [body, errorResponse] = await parseBody(request, putSchema);
    if (errorResponse) return errorResponse;

    const settings = await upsertSettings(body.settings);
    return ok({ items: settings, message: "Paramètres enregistrés" });
  }, { roles: ["admin", "editor"] });
}
