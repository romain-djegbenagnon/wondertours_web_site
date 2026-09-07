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
import { parseItineraryLines, splitLines } from "@/lib/format";

interface Option {
  value: string;
  label: string;
}

const EMPTY = {
  title: "",
  titleEn: "",
  subtitle: "",
  subtitleEn: "",
  description: "",
  descriptionEn: "",
  durationDays: "",
  durationNights: "",
  itinerary: "",
  highlights: "",
  included: "",
  excluded: "",
  destinationId: "",
  categoryId: "",
  price: "",
  difficulty: "moderate",
  minParticipants: "",
  maxParticipants: "",
  imageUrl: "",
  isFeatured: false,
  isActive: true,
};

export function CircuitForm({
  destinations,
  categories,
}: {
  destinations: Option[];
  categories: Option[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function optionalNumber(value: string): number | null {
    return value.trim() ? Number(value) : null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.title.trim()) {
      setError("Le titre (FR) est requis.");
      return;
    }
    if (form.price === "") {
      setError("Le prix est requis.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/dashboard/circuits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          titleEn: form.titleEn || null,
          subtitle: form.subtitle || null,
          subtitleEn: form.subtitleEn || null,
          description: form.description || null,
          descriptionEn: form.descriptionEn || null,
          destinationId: form.destinationId || null,
          categoryId: form.categoryId || null,
          durationDays: optionalNumber(form.durationDays),
          durationNights: optionalNumber(form.durationNights),
          price: Number(form.price),
          difficulty: form.difficulty,
          minParticipants: optionalNumber(form.minParticipants),
          maxParticipants: optionalNumber(form.maxParticipants),
          imageUrl: form.imageUrl || null,
          highlights: splitLines(form.highlights),
          itinerary: parseItineraryLines(form.itinerary),
          included: splitLines(form.included),
          excluded: splitLines(form.excluded),
          isFeatured: form.isFeatured,
          isActive: form.isActive,
        }),
      });
      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }
      router.push("/dashboard/circuits");
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
          <Button variant="ghost" href="/dashboard/circuits">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau circuit</h1>
            <p className="text-gray-600 mt-1">Créez un nouveau circuit touristique</p>
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
                label="Titre (FR) *"
                placeholder="Circuit Ouidah - Route des Esclaves"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
              <Input
                label="Titre (EN)"
                placeholder="Ouidah Circuit - Slave Route"
                value={form.titleEn}
                onChange={(e) => update("titleEn", e.target.value)}
              />
              <Input
                label="Sous-titre (FR)"
                placeholder="Découvrez l&apos;histoire de la traite des esclaves"
                value={form.subtitle}
                onChange={(e) => update("subtitle", e.target.value)}
              />
              <Input
                label="Sous-titre (EN)"
                value={form.subtitleEn}
                onChange={(e) => update("subtitleEn", e.target.value)}
              />
              <Textarea
                label="Description (FR)"
                rows={6}
                placeholder="Description complète du circuit..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
              <Textarea
                label="Description (EN)"
                rows={6}
                value={form.descriptionEn}
                onChange={(e) => update("descriptionEn", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itinéraire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Durée (jours)"
                  type="number"
                  placeholder="2"
                  value={form.durationDays}
                  onChange={(e) => update("durationDays", e.target.value)}
                />
                <Input
                  label="Durée (nuits)"
                  type="number"
                  placeholder="1"
                  value={form.durationNights}
                  onChange={(e) => update("durationNights", e.target.value)}
                />
              </div>
              <Textarea
                label="Programme détaillé (une ligne par jour, format « Titre : description »)"
                rows={8}
                placeholder={"Jour 1 : Visite du musée d'histoire\nJour 2 : Départ pour Ganvié"}
                value={form.itinerary}
                onChange={(e) => update("itinerary", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Points forts</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                label="Points forts (un par ligne)"
                rows={4}
                placeholder={"Visite du musée d'histoire\nMarché des fétiches\nPlage de Grand-Popo"}
                value={form.highlights}
                onChange={(e) => update("highlights", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inclus / Non inclus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                label="Services inclus (un par ligne)"
                rows={4}
                placeholder={"Transport climatisé\nGuide francophone\nHébergement"}
                value={form.included}
                onChange={(e) => update("included", e.target.value)}
              />
              <Textarea
                label="Services non inclus (un par ligne)"
                rows={4}
                placeholder={"Billets d'avion\nAssurance voyage\nDépenses personnelles"}
                value={form.excluded}
                onChange={(e) => update("excluded", e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="Destination"
                options={[{ value: "", label: "Sélectionner" }, ...destinations]}
                value={form.destinationId}
                onChange={(e) => update("destinationId", e.target.value)}
              />
              <Select
                label="Catégorie"
                options={[{ value: "", label: "Sélectionner" }, ...categories]}
                value={form.categoryId}
                onChange={(e) => update("categoryId", e.target.value)}
              />
              <Input
                label="Prix (FCFA) *"
                type="number"
                placeholder="85000"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
              />
              <Select
                label="Difficulté"
                options={[
                  { value: "easy", label: "Facile" },
                  { value: "moderate", label: "Modéré" },
                  { value: "challenging", label: "Difficile" },
                ]}
                value={form.difficulty}
                onChange={(e) => update("difficulty", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Min. participants"
                  type="number"
                  placeholder="2"
                  value={form.minParticipants}
                  onChange={(e) => update("minParticipants", e.target.value)}
                />
                <Input
                  label="Max. participants"
                  type="number"
                  placeholder="20"
                  value={form.maxParticipants}
                  onChange={(e) => update("maxParticipants", e.target.value)}
                />
              </div>
              <Input
                label="URL de l'image principale"
                placeholder="/uploads/exemple.jpg"
                value={form.imageUrl}
                onChange={(e) => update("imageUrl", e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="circuit-active" className="text-sm font-medium text-gray-700">
                  Actif
                </label>
                <input
                  id="circuit-active"
                  type="checkbox"
                  className="rounded"
                  checked={form.isActive}
                  onChange={(e) => update("isActive", e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="circuit-featured" className="text-sm font-medium text-gray-700">
                  À la une
                </label>
                <input
                  id="circuit-featured"
                  type="checkbox"
                  className="rounded"
                  checked={form.isFeatured}
                  onChange={(e) => update("isFeatured", e.target.checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
