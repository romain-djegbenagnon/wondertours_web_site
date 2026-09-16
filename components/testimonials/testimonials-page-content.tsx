"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";
import { useLanguage } from "@/contexts/language-context";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialsPageContentProps {
  testimonials: Testimonial[];
  averageRating: number;
}

/**
 * Corps bilingue de la page "Témoignages" (stats, grille, CTA). Le rendu
 * serveur ne peut pas lire la locale (contexte client) : la page serveur
 * garde le fetch des données et délègue l'affichage à ce composant client.
 */
export function TestimonialsPageContent({
  testimonials,
  averageRating,
}: TestimonialsPageContentProps) {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <>
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2">
                {testimonials.length}
              </div>
              <p className="text-text-secondary">
                {isFr ? "Témoignages" : "Testimonials"}
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-5xl font-heading font-bold text-primary">
                  {averageRating.toFixed(1)}
                </span>
                <Star className="w-8 h-8 fill-secondary text-secondary" />
              </div>
              <p className="text-text-secondary">
                {isFr ? "Note moyenne" : "Average rating"}
              </p>
            </div>
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2">
                20+
              </div>
              <p className="text-text-secondary">
                {isFr ? "Années d'expérience" : "Years of experience"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title={
              isFr
                ? "Ils ont voyagé avec Wonder Tours and Services"
                : "They traveled with Wonder Tours and Services"
            }
          />
          <TestimonialsContent testimonials={testimonials} />
          {testimonials.length === 0 && (
            <p className="text-center text-text-secondary py-12">
              {isFr
                ? "Aucun témoignage pour le moment."
                : "No testimonials yet."}
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <SectionHeading
            title={
              isFr ? "Vous avez voyagé avec nous ?" : "Have you traveled with us?"
            }
          />
          <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
            {isFr
              ? "Partagez votre expérience et aidez d'autres voyageurs à découvrir le Bénin avec Wonder Tours and Services."
              : "Share your experience and help other travelers discover Benin with Wonder Tours and Services."}
          </p>
          <Button variant="primary" size="lg" href="/contact">
            {isFr ? "Partager mon témoignage" : "Share my testimonial"}
          </Button>
        </div>
      </section>
    </>
  );
}
