"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

/**
 * Section CTA bilingue de la page Circuits. Le rendu serveur ne peut pas
 * lire la locale (contexte client) : ce petit composant client fait le
 * pont entre les deux.
 */
export function CircuitsCtaSection() {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <SectionHeading
          title={
            isFr
              ? "Vous ne trouvez pas ce que vous cherchez ?"
              : "Can't find what you're looking for?"
          }
        />
        <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
          {isFr
            ? "Nous pouvons créer un circuit personnalisé adapté à vos envies et à votre budget."
            : "We can create a custom tour tailored to your wishes and budget."}
        </p>
        <Button variant="primary" size="lg" href="/contact">
          {isFr ? "Demander un circuit sur mesure" : "Request a custom tour"}
        </Button>
      </div>
    </section>
  );
}
