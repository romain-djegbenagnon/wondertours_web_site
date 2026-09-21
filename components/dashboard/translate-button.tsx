"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { readApiError } from "@/components/dashboard/api-error";

/**
 * Bouton « Traduire en anglais » des formulaires du dashboard : envoie les
 * champs FR au route handler protégé /api/dashboard/translate (DeepL) puis
 * remplit les champs EN via le callback `onTranslated`.
 *
 * Sans DEEPL_API_KEY côté serveur, l'API répond 503 et le message s'affiche
 * sous le bouton (aucune traduction silencieuse).
 */
export function TranslateButton({
  fields,
  onTranslated,
  disabled,
}: {
  /** Clé libre → texte source à traduire. Les entrées vides sont ignorées. */
  fields: Record<string, string>;
  onTranslated: (results: Record<string, string>) => void;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTranslate() {
    const texts = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value.trim().length > 0)
    );
    if (Object.keys(texts).length === 0) {
      setError("Remplissez d'abord les champs français à traduire.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/dashboard/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts, targetLocale: "en" }),
      });
      if (!response.ok) {
        setError(await readApiError(response));
        return;
      }
      const data = (await response.json()) as {
        texts: Record<string, string>;
      };
      onTranslated(data.texts);
    } catch {
      setError("Erreur réseau");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleTranslate}
        disabled={disabled || busy}
      >
        <Languages className="w-4 h-4 mr-2" />
        {busy ? "Traduction…" : "Traduire en anglais (DeepL)"}
      </Button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
