"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CircuitCard } from "@/components/circuits/circuit-card";
import { Button } from "@/components/ui/button";
import { CIRCUITS } from "@/lib/data/circuits";
import { CATEGORIES, DESTINATIONS } from "@/lib/constants";

export default function CircuitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const filteredCircuits = CIRCUITS.filter((circuit) => {
    if (selectedCategory !== "all" && circuit.category !== selectedCategory) {
      return false;
    }
    if (selectedDestination !== "all" && circuit.destination !== selectedDestination) {
      return false;
    }
    return true;
  });

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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCircuits.map((circuit) => (
                  <CircuitCard key={circuit.id} circuit={circuit} />
                ))}
              </div>
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
