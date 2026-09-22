"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LocalizedHero } from "@/components/common/localized-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";

/**
 * Corps bilingue de la page "Séjours". Le rendu serveur ne peut pas lire
 * la locale (contexte client) : la page serveur garde les métadonnées et
 * délègue l'affichage à ce composant client.
 */
export function SejoursContent() {
  const { t, locale } = useLanguage();
  const isFr = locale === "fr";

  const steps = isFr
    ? [
        {
          step: "01",
          title: "Échange",
          description:
            "Nous échangeons sur vos envies, vos préférences, votre budget et vos contraintes pour comprendre parfaitement vos besoins.",
        },
        {
          step: "02",
          title: "Conception",
          description:
            "Nous concevons un séjour personnalisé avec un itinéraire adapté, des activités choisies et des hébergements sélectionnés.",
        },
        {
          step: "03",
          title: "Accompagnement",
          description:
            "Nous vous accompagnons tout au long de votre séjour pour garantir une expérience réussie et mémorable.",
        },
      ]
    : [
        {
          step: "01",
          title: "Discussion",
          description:
            "We discuss your wishes, preferences, budget and constraints to perfectly understand your needs.",
        },
        {
          step: "02",
          title: "Design",
          description:
            "We design a personalized stay with a tailored itinerary, chosen activities and selected accommodations.",
        },
        {
          step: "03",
          title: "Support",
          description:
            "We support you throughout your stay to guarantee a successful and memorable experience.",
        },
      ];

  const includedServices = isFr
    ? [
        "Transport tout au long du séjour",
        "Hébergement sélectionné",
        "Guide francophone expérimenté",
        "Visites et activités programmées",
        "Assistance 24/7 pendant le séjour",
        "Conseils et recommandations personnalisés",
      ]
    : [
        "Transport throughout your stay",
        "Carefully selected accommodation",
        "Experienced French-speaking guide",
        "Scheduled visits and activities",
        "24/7 assistance during your stay",
        "Personalized advice and recommendations",
      ];

  const customizationOptions = isFr
    ? [
        "Durée du séjour flexible",
        "Destinations au choix",
        "Thématiques variées (culture, nature, aventure, détente...)",
        "Budget adapté",
        "Hébergements selon vos préférences",
        "Activités sur mesure",
      ]
    : [
        "Flexible stay duration",
        "Destinations of your choice",
        "Varied themes (culture, nature, adventure, relaxation...)",
        "Adapted budget",
        "Accommodations to suit your preferences",
        "Tailor-made activities",
      ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <LocalizedHero
          subtitle="ORGANISATION DE SÉJOURS"
          titleFr="Votre séjour au Bénin, au Togo ou au Ghana, pensé selon vos envies"
          titleEn="Your stay in Benin, Togo or Ghana, designed around your wishes"
          descriptionFr="Nous concevons des séjours sur mesure adaptés à vos préférences, votre budget et votre temps. Laissez-nous créer l'expérience parfaite pour vous."
          descriptionEn="We design tailor-made stays adapted to your preferences, budget and time. Let us create the perfect experience for you."
          ctaFr="Créer mon séjour"
          ctaEn="Create my stay"
          ctaHref="/contact"
          secondaryCtaFr="En savoir plus"
          secondaryCtaEn="Learn more"
          secondaryCtaHref="#process"
          image="/photos_site wonder_tours/IMG_20260313_104311_648.jpg"
        />

        {/* Process Section */}
        <section id="process" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title={isFr ? "Notre processus en 3 étapes" : "Our 3-step process"}
            />
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title={isFr ? "Ce que nous incluons dans nos séjours" : "What we include in our stays"}
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {includedServices.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <p className="text-text font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customization Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading
                  title={isFr ? "Un séjour 100% personnalisé" : "A 100% personalized stay"}
                  align="left"
                />
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  {isFr
                    ? "Chaque voyageur est unique. C'est pourquoi nous créons des séjours entièrement personnalisés selon vos envies :"
                    : "Every traveler is unique. That's why we create fully personalized stays according to your wishes:"}
                </p>
                <ul className="space-y-3 mb-8">
                  {customizationOptions.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-secondary">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/photos_site wonder_tours/sejours.png"
                  alt={isFr ? "Séjour personnalisé" : "Personalized stay"}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary relative">
          <div className="absolute inset-0">
            <img
              src="/photos_site wonder_tours/IMG-20260625-WA0039.jpg"
              alt={isFr ? "Créer votre séjour" : "Create your stay"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {isFr ? "Prêt à créer votre séjour sur mesure ?" : "Ready to create your tailor-made stay?"}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              {isFr
                ? "Contactez-nous pour discuter de votre projet de voyage au Bénin, au Togo ou au Ghana."
                : "Contact us to discuss your travel project in Benin, Togo or Ghana."}
            </p>
            <Button variant="primary" size="lg" href="/contact">
              {isFr ? "Créer mon séjour" : "Create my stay"}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
