"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function HotelsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    arrivalDate: "",
    departureDate: "",
    travelers: "",
    accommodationType: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-heading text-3xl font-bold text-text mb-4">
                Votre demande a bien été envoyée
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Un conseiller Wonder Tours vous contactera prochainement pour vous accompagner dans votre recherche d'hébergement.
              </p>
              <Button variant="primary" href="/" onClick={() => setIsSubmitted(false)}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <Hero
          subtitle="RÉSERVATION D'HÔTELS"
          title="Trouvez votre hébergement au Bénin"
          description="Nous vous aidons à trouver et réserver l'hébergement parfait pour votre séjour au Bénin, selon vos préférences et votre budget."
          primaryCta={{ text: "Faire une demande", href: "#form" }}
          image="[PHOTO HERO HÔTELS À REMPLACER]"
        />

        {/* Info Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeading
                title="Notre service d'assistance hôtelière"
              />
              <p className="text-text-secondary text-xl leading-relaxed mb-8">
                Un conseiller Wonder Tours vous accompagnera dans votre recherche d'hébergement pour trouver l'hôtel idéal adapté à vos besoins, votre budget et vos préférences.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  "Sélection d'hôtels de qualité",
                  "Meilleurs tarifs négociés",
                  "Assistance personnalisée"
                ].map((benefit, index) => (
                  <div key={index} className="bg-background p-6 rounded-xl">
                    <p className="text-text font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="form" className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <SectionHeading
                title="Faites une demande de réservation"
              />
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <Input
                  label="Nom complet"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                
                <Input
                  label="Téléphone / WhatsApp"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Date d'arrivée"
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                    required
                  />
                  
                  <Input
                    label="Date de départ"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    required
                  />
                </div>
                
                <Input
                  label="Nombre de voyageurs"
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  required
                />
                
                <Select
                  label="Type d'hébergement"
                  options={[
                    { value: "", label: "Sélectionnez un type" },
                    { value: "hotel", label: "Hôtel" },
                    { value: "guesthouse", label: "Guesthouse / Auberge" },
                    { value: "resort", label: "Resort" },
                    { value: "villa", label: "Villa" },
                    { value: "autre", label: "Autre" }
                  ]}
                  value={formData.accommodationType}
                  onChange={(e) => setFormData({ ...formData, accommodationType: e.target.value })}
                  required
                />
                
                <Select
                  label="Budget approximatif (par nuit)"
                  options={[
                    { value: "", label: "Sélectionnez une fourchette" },
                    { value: "low", label: "Moins de 50 000 FCFA" },
                    { value: "medium", label: "50 000 - 100 000 FCFA" },
                    { value: "high", label: "100 000 - 200 000 FCFA" },
                    { value: "luxury", label: "Plus de 200 000 FCFA" }
                  ]}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
                
                <Textarea
                  label="Message (préférences, besoins spécifiques...)"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Indiquez vos préférences, vos besoins spécifiques ou toute autre information utile..."
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </Button>
                
                <p className="text-text-secondary text-sm text-center">
                  Un conseiller Wonder Tours vous contactera dans les 24h.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
