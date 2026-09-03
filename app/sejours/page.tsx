import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Organisation de séjours - Wonder Tours and Services",
  description: "Créez votre séjour sur mesure au Bénin avec Wonder Tours and Services. Organisation personnalisée, transport, hébergement et accompagnement.",
  path: "/sejours"
});

export default function SejoursPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <Hero
          subtitle="ORGANISATION DE SÉJOURS"
          title="Votre séjour au Bénin, pensé selon vos envies"
          description="Nous concevons des séjours sur mesure adaptés à vos préférences, votre budget et votre temps. Laissez-nous créer l'expérience parfaite pour vous."
          primaryCta={{ text: "Créer mon séjour", href: "/contact" }}
          secondaryCta={{ text: "En savoir plus", href: "#process" }}
          image="[PHOTO HERO SÉJOURS À REMPLACER]"
        />

        {/* Process Section */}
        <section id="process" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Notre processus en 3 étapes"
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Échange",
                  description: "Nous échangeons sur vos envies, vos préférences, votre budget et vos contraintes pour comprendre parfaitement vos besoins."
                },
                {
                  step: "02",
                  title: "Conception",
                  description: "Nous concevons un séjour personnalisé avec un itinéraire adapté, des activités choisies et des hébergements sélectionnés."
                },
                {
                  step: "03",
                  title: "Accompagnement",
                  description: "Nous vous accompagnons tout au long de votre séjour pour garantir une expérience réussie et mémorable."
                }
              ].map((item, index) => (
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
              title="Ce que nous incluons dans nos séjours"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Transport tout au long du séjour",
                "Hébergement sélectionné",
                "Guide francophone expérimenté",
                "Visites et activités programmées",
                "Assistance 24/7 pendant le séjour",
                "Conseils et recommandations personnalisés"
              ].map((service, index) => (
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
                  title="Un séjour 100% personnalisé"
                  align="left"
                />
                <p className="text-text-secondary text-lg leading-relaxed mb-6">
                  Chaque voyageur est unique. C'est pourquoi nous créons des séjours entièrement personnalisés selon vos envies :
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Durée du séjour flexible",
                    "Destinations au choix",
                    "Thématiques variées (culture, nature, aventure, détente...)",
                    "Budget adapté",
                    "Hébergements selon vos préférences",
                    "Activités sur mesure"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-text-secondary">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="[PHOTO SÉJOUR PERSONNALISÉ À REMPLACER]"
                  alt="Séjour personnalisé"
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
              src="[PHOTO CTA SÉJOURS À REMPLACER]"
              alt="Créer votre séjour"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/90" />
          </div>
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Prêt à créer votre séjour sur mesure ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Contactez-nous pour discuter de votre projet de voyage au Bénin.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Créer mon séjour
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
