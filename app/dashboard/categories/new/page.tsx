"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { readApiError } from "@/components/dashboard/api-error";

const EMPTY = {
  name: "",
  nameEn: "",
  description: "",
  descriptionEn: "",
  icon: "",
  color: "#3B82F6",
  sortOrder: "0",
  isActive: true,
};

export default function NewCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) {
      setError("Le nom (FR) est requis (2 caractères minimum).");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/dashboard/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          nameEn: form.nameEn || null,
          description: form.description || null,
          descriptionEn: form.descriptionEn || null,
          icon: form.icon || null,
          color: form.color || null,
          sortOrder: Number(form.sortOrder || 0),
          isActive: form.isActive,
        }),
      });
      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }
      router.push("/dashboard/categories");
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="/dashboard/categories">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouvelle catégorie</h1>
            <p className="text-gray-600 mt-1">Ajoutez une nouvelle catégorie de circuits</p>
          </div>
        </div>
        <Button type="submit" disabled={busy}>
          <Save className="w-4 h-4 mr-2" />
          {busy ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Nom (FR) *"
                placeholder="Culture"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              <Input
                label="Nom (EN)"
                placeholder="Culture"
                value={form.nameEn}
                onChange={(e) => update("nameEn", e.target.value)}
              />
              <Textarea
                label="Description (FR)"
                rows={4}
                placeholder="Découvrez la culture locale et les traditions..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
              <Textarea
                label="Description (EN)"
                rows={4}
                value={form.descriptionEn}
                onChange={(e) => update("descriptionEn", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Icône"
                options={[
                  { value: "", label: "Sélectionner une icône" },
                  { value: "landmark", label: "Landmark (Monument)" },
                  { value: "scroll", label: "Scroll (Histoire)" },
                  { value: "tree-pine", label: "Tree Pine (Nature)" },
                  { value: "waves", label: "Waves (Littoral)" },
                  { value: "sparkles", label: "Sparkles (Vodoun)" },
                  { value: "users", label: "Users (Expérience locale)" },
                  { value: "mountain", label: "Mountain (Aventure)" },
                  { value: "camera", label: "Camera (Photographie)" },
                  { value: "utensils", label: "Utensils (Gastronomie)" },
                  { value: "music", label: "Music (Musique)" },
                ]}
                value={form.icon}
                onChange={(e) => update("icon", e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    aria-label="Choisir une couleur"
                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    value={form.color}
                    onChange={(e) => update("color", e.target.value)}
                  />
                  <Input
                    placeholder="#3B82F6"
                    className="flex-1"
                    value={form.color}
                    onChange={(e) => update("color", e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Choisissez une couleur pour identifier cette catégorie
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Affichage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Ordre d'affichage"
                type="number"
                value={form.sortOrder}
                onChange={(e) => update("sortOrder", e.target.value)}
              />
              <div className="flex items-center justify-between">
                <label htmlFor="category-active" className="text-sm font-medium text-gray-700">
                  Actif
                </label>
                <input
                  id="category-active"
                  type="checkbox"
                  className="rounded"
                  checked={form.isActive}
                  onChange={(e) => update("isActive", e.target.checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
