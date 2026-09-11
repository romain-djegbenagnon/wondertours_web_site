import { listSettings } from "@/lib/services/settings";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await listSettings();
  const initial = Object.fromEntries(
    settings
      .filter((setting) => setting.value !== null)
      .map((setting) => [setting.key, setting.value as string])
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Configurez les paramètres du site</p>
      </div>
      <SettingsForm initial={initial} />
    </div>
  );
}
