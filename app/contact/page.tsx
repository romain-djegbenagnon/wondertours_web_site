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
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    requestType: "",
    travelDate: "",
    travelers: "",
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
                Notre équipe vous contactera prochainement pour répondre à votre demande.
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
          subtitle="CONTACT"
          title="Parlons de votre prochain voyage"
          description="Contactez-nous pour planifier votre voyage au Bénin, demander un devis ou simplement en savoir plus sur nos services."
          primaryCta={{ text: "Remplir le formulaire", href: "#form" }}
          secondaryCta={{ text: "WhatsApp", href: SITE_CONFIG.links.whatsapp }}
          image="[PHOTO HERO CONTACT À REMPLACER]"
        />

        {/* Contact Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-2">Adresse</h3>
                <p className="text-text-secondary">{SITE_CONFIG.contact.address}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-2">Téléphone</h3>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-2">Email</h3>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Form and Map */}
        <section id="form" className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <SectionHeading
                  title="Envoyez-nous un message"
                  align="left"
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
                  
                  <Input
                    label="Objet"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  
                  <Select
                    label="Type de demande"
                    options={[
                      { value: "", label: "Sélectionnez un type" },
                      { value: "circuit", label: "Réservation de circuit" },
                      { value: "sejour", label: "Organisation de séjour" },
                      { value: "hotel", label: "Réservation d'hôtel" },
                      { value: "info", label: "Demande d'informations" },
                      { value: "autre", label: "Autre" }
                    ]}
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    required
                  />
                  
                  <Input
                    label="Date prévue du voyage"
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />
                  
                  <Input
                    label="Nombre de voyageurs"
                    type="number"
                    min="1"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  />
                  
                  <Textarea
                    label="Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet de voyage, vos questions ou vos demandes spécifiques..."
                    required
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
                </form>
              </div>

              {/* Map and WhatsApp */}
              <div className="space-y-8">
                {/* Map */}
                <div>
                  <SectionHeading
                    title="Notre localisation"
                    align="left"
                  />
                  <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                    <p className="text-text-secondary">
                      [CARTE GOOGLE MAPS À INTÉGRER]
                    </p>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-text mb-2">
                        Discutez sur WhatsApp
                      </h3>
                      <p className="text-text-secondary mb-4">
                        Contactez-nous directement sur WhatsApp pour une réponse rapide.
                      </p>
                      <a
                        href={SITE_CONFIG.links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Ouvrir WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
