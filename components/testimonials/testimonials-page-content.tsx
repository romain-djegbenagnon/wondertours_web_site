"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";
import { useLanguage } from "@/contexts/language-context";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialsPageContentProps {
  testimonials: Testimonial[];
  averageRating: number;
  currentPage?: number;
  totalPages?: number;
  totalTestimonials?: number;
}

/**
 * Corps bilingue de la page "Témoignages" (stats, grille, CTA). Le rendu
 * serveur ne peut pas lire la locale (contexte client) : la page serveur
 * garde le fetch des données et délègue l'affichage à ce composant client.
 */
export function TestimonialsPageContent({
  testimonials,
  averageRating,
  currentPage = 1,
  totalPages = 1,
  totalTestimonials = testimonials.length,
}: TestimonialsPageContentProps) {
  const { locale } = useLanguage();
  const isFr = locale === "fr";
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-heading font-bold text-primary mb-2">
                {totalTestimonials}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {getPageNumbers().map((page, index) => (
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-text-secondary">
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => handlePageChange(page as number)}
                    className={currentPage === page ? "bg-amber-600 hover:bg-amber-700" : ""}
                  >
                    {page}
                  </Button>
                )
              ))}

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
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
