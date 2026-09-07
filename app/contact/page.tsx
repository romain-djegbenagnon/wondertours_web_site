"use client";

import { useState, useEffect } from "react";
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
import { useLanguage } from "@/contexts/language-context";

interface SiteConfig {
  map: {
    embedUrl: string;
  };
}

export default function ContactPage() {
  const { t, locale } = useLanguage();
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mapEmbedUrl, setMapEmbedUrl] = useState<string>(SITE_CONFIG.map.embedUrl as string);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/settings');
      const data: SiteConfig = await response.json();
      if (data.map?.embedUrl) {
        setMapEmbedUrl(data.map.embedUrl);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          requestType: formData.requestType,
          travelDate: formData.travelDate,
          travelers: formData.travelers ? Number(formData.travelers) : undefined,
          message: formData.message,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const details = Array.isArray((data as { details?: unknown[] })?.details)
          ? ` (${(data as { details: { message?: string }[] }).details.map((d) => d.message).join(", ")})`
          : "";
        setErrorMessage(
          (data as { error?: string })?.error
            ? `${(data as { error: string }).error}${details}`
            : "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
        );
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage("Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsSubmitting(false);
    }
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
                {t.contact.form.sent}
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                {locale === "fr" ? "Notre équipe vous contactera prochainement pour répondre à votre demande." : "Our team will contact you shortly to answer your request."}
              </p>
              <Button variant="primary" href="/" onClick={() => setIsSubmitted(false)}>
                {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
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
          title={locale === "fr" ? "Parlons de votre prochain voyage" : "Let's talk about your next trip"}
          description={locale === "fr" ? "Contactez-nous pour planifier votre voyage au Bénin, demander un devis ou simplement en savoir plus sur nos services." : "Contact us to plan your trip to Benin, request a quote, or simply learn more about our services."}
          primaryCta={{ text: locale === "fr" ? "Remplir le formulaire" : "Fill the form", href: "#form" }}
          secondaryCta={{ text: "WhatsApp", href: SITE_CONFIG.links.whatsapp }}
          image="[PHOTO HERO CONTACT À REMPLACER]"
        />

        {/* Contact Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title={t.contact.info.title}
              subtitle=""
            />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-2">{t.contact.info.address}</h3>
                <p className="text-text-secondary">{SITE_CONFIG.contact.address}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-text mb-2">{t.contact.info.phone}</h3>
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
                <h3 className="font-heading text-xl font-bold text-text mb-2">{t.contact.info.email}</h3>
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
                  title={t.contact.form.title}
                  align="left"
                />
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <Input
                    label={t.contact.form.name}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  
                  <Input
                    label={t.contact.form.email}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  
                  <Input
                    label={t.contact.form.phone}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  
                  <Input
                    label={t.contact.form.subject}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                  
                  <Select
                    label={t.contact.form.requestType}
                    options={[
                      { value: "", label: locale === "fr" ? "Sélectionnez un type" : "Select a type" },
                      { value: "circuit", label: locale === "fr" ? "Réservation de circuit" : "Tour booking" },
                      { value: "sejour", label: locale === "fr" ? "Organisation de séjour" : "Stay organization" },
                      { value: "hotel", label: locale === "fr" ? "Réservation d'hôtel" : "Hotel booking" },
                      { value: "info", label: t.contact.requestTypes.information },
                      { value: "autre", label: t.contact.requestTypes.other }
                    ]}
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    required
                  />
                  
                  <Input
                    label={t.contact.form.travelDate}
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />
                  
                  <Input
                    label={t.contact.form.travelers}
                    type="number"
                    min="1"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  />
                  
                  <Textarea
                    label={t.contact.form.message}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={locale === "fr" ? "Décrivez votre projet de voyage, vos questions ou vos demandes spécifiques..." : "Describe your travel project, questions or specific requests..."}
                    required
                  />
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                  </Button>
                </form>
              </div>

              {/* Map and WhatsApp */}
              <div className="space-y-8">
                {/* Map */}
                <div>
                  <SectionHeading
                    title={t.contact.location.title}
                    align="left"
                  />
                  <div className="rounded-2xl overflow-hidden h-64">
                    <iframe
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-green-50 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-text mb-2">
                        {t.contact.whatsapp.title}
                      </h3>
                      <p className="text-text-secondary mb-4">
                        {t.contact.whatsapp.description}
                      </p>
                      <a
                        href={SITE_CONFIG.links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant="primary">
                          {t.contact.whatsapp.button}
                        </Button>
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
