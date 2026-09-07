"use client";

import { useState } from "react";
import { CircuitCard } from "@/components/circuits/circuit-card";
import { Button } from "@/components/ui/button";
import type { Circuit } from "@/lib/data/circuits";

interface CircuitsExplorerProps {
  circuits: Circuit[];
  categories: string[];
  destinations: string[];
  initialCategory?: string;
}

export function CircuitsExplorer({
  circuits,
  categories,
  destinations,
  initialCategory = "all",
}: CircuitsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const filteredCircuits = circuits.filter((circuit) => {
    if (selectedCategory !== "all" && circuit.category !== selectedCategory) {
      return false;
    }
    if (selectedDestination !== "all" && circuit.destination !== selectedDestination) {
      return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedDestination("all");
  };

  return (
    <>
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
              {categories.map((category) => (
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
              {destinations.map((destination) => (
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
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
