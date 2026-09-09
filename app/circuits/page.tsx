"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CircuitCard } from "@/components/circuits/circuit-card";
import { Button } from "@/components/ui/button";
import { CIRCUITS } from "@/lib/data/circuits";
import { CATEGORIES, DESTINATIONS } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CircuitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const circuitsPerPage = 6;

  const filteredCircuits = CIRCUITS.filter((circuit) => {
    if (selectedCategory !== "all" && circuit.category !== selectedCategory) {
      return false;
    }
    if (selectedDestination !== "all" && circuit.destination !== selectedDestination) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredCircuits.length / circuitsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedDestination]);

  const getCurrentCircuits = () => {
    const startIndex = (currentPage - 1) * circuitsPerPage;
    const endIndex = startIndex + circuitsPerPage;
    return filteredCircuits.slice(startIndex, endIndex);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <Hero
          subtitle="NOS CIRCUITS"
          title="Explorez nos circuits touristiques"
          description="Découvrez le Bénin à travers nos circuits soigneusement conçus pour vous offrir des expériences authentiques et inoubliables."
          primaryCta={{ text: "Demander un devis", href: "/contact" }}
          image="[PHOTO HERO CIRCUITS À REMPLACER]"
        />

        {/* Filters Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-text hover:bg-amber-100 hover:text-amber-700"
                  }`}
                >
                  Toutes les catégories
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-text hover:bg-amber-100 hover:text-amber-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDestination("all")}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedDestination === "all"
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-text hover:bg-amber-100 hover:text-amber-700"
                  }`}
                >
                  Toutes les destinations
                </button>
                {DESTINATIONS.map((destination) => (
                  <button
                    key={destination}
                    onClick={() => setSelectedDestination(destination)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedDestination === destination
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-text hover:bg-amber-100 hover:text-amber-700"
                    }`}
                  >
                    {destination}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Circuits Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-text-secondary">
                {filteredCircuits.length} circuit{filteredCircuits.length > 1 ? "s" : ""} trouvé{filteredCircuits.length > 1 ? "s" : ""}
              </p>
            </div>

            {filteredCircuits.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getCurrentCircuits().map((circuit) => (
                    <CircuitCard key={circuit.id} circuit={circuit} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevious}
                      disabled={currentPage === 1}
                      className="rounded-full px-4"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Précédent
                    </Button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => goToPage(index + 1)}
                          className={`w-10 h-10 rounded-full font-medium transition-all ${
                            currentPage === index + 1
                              ? "bg-primary text-white"
                              : "bg-white text-text hover:bg-gray-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNext}
                      disabled={currentPage === totalPages}
                      className="rounded-full px-4"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-secondary text-xl mb-6">
                  Aucun circuit ne correspond à vos critères.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDestination("all");
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <SectionHeading
              title="Vous ne trouvez pas ce que vous cherchez ?"
            />
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Nous pouvons créer un circuit personnalisé adapté à vos envies et à votre budget.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Demander un circuit sur mesure
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
