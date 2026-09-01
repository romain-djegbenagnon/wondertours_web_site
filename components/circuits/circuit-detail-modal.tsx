"use client";

import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Check, X } from "lucide-react";
import { Circuit } from "@/lib/data/circuits";

interface CircuitDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  circuit: Circuit;
}

export function CircuitDetailModal({ isOpen, onClose, circuit }: CircuitDetailModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="relative h-64 md:h-80">
        <img
          src={circuit.image}
          alt={circuit.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="default">{circuit.category}</Badge>
            <Badge variant="secondary">{circuit.destination}</Badge>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            {circuit.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-white text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {circuit.duration}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {circuit.destination}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <div>
            <span className="text-3xl font-bold text-primary">
              {circuit.price.toLocaleString()} FCFA
            </span>
            <span className="text-text-secondary text-sm"> /personne</span>
          </div>
          <Button variant="primary" href="/contact">
            Demander un devis
          </Button>
        </div>

        <div className="mb-6">
          <h3 className="font-heading text-xl font-bold text-text mb-3">
            À propos de ce circuit
          </h3>
          <p className="text-text-secondary leading-relaxed">
            {circuit.description}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-heading text-xl font-bold text-text mb-3">
            Points forts
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {circuit.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-heading text-xl font-bold text-text mb-3">
            Programme
          </h3>
          <div className="space-y-4">
            {circuit.itinerary.map((day) => (
              <div key={day.day} className="bg-background p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent">Jour {day.day}</Badge>
                  <h4 className="font-heading font-bold text-text">
                    {day.title}
                  </h4>
                </div>
                <p className="text-text-secondary text-sm">{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-heading text-lg font-bold text-text mb-3">
              Ce qui est inclus
            </h3>
            <ul className="space-y-2">
              {circuit.included.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-text mb-3">
              Ce qui n'est pas inclus
            </h3>
            <ul className="space-y-2">
              {circuit.excluded.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
