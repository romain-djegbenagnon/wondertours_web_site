"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardImage, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";
import { Circuit } from "@/lib/data/circuits";
import { CircuitDetailModal } from "./circuit-detail-modal";

interface CircuitCardProps {
  circuit: Circuit;
}

export function CircuitCard({ circuit }: CircuitCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
      >
        <Card className="group h-full">
          <CardImage src={circuit.image} alt={circuit.title} />
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="default">{circuit.category}</Badge>
              <div className="flex items-center text-text-secondary text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {circuit.duration}
              </div>
            </div>

            <h3 className="font-heading text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
              {circuit.title}
            </h3>

            <div className="flex items-center text-text-secondary text-sm mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {circuit.destination}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-primary">
                {circuit.price.toLocaleString()} FCFA
              </div>
              <span className="text-text-secondary text-sm">/personne</span>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Découvrir
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <CircuitDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        circuit={circuit}
      />
    </>
  );
}
