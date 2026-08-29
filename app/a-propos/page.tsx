import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "À propos - Wonder Tours and Services",
  description: "Découvrez Wonder Tours and Services, plus de 20 ans d'expertise touristique au Bénin. Notre histoire, nos valeurs et notre vision du tourisme authentique.",
  path: "/a-propos"
});

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <Hero
          subtitle="NOTRE HISTOIRE"
          title="Une passion pour le voyage. Une expertise du Bénin."
          description="Depuis plus de 20 ans, Wonder Tours and Services accompagne les voyageurs dans la découverte des trésors du Bénin."
          primaryCta={{ text: "Découvrir nos circuits", href: "/circuits" }}
          secondaryCta={{ text: "Nous contacter", href: "/contact" }}
          image="[PHOTO HERO À PROPOS À REMPLACER]"
        />

        {/* History Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Notre histoire"
              align="left"
            />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Wonder Tours and Services est né d'une passion profonde pour le Bénin et de la volonté de partager la richesse culturelle et naturelle de ce pays avec le monde entier.
                </p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Fondée par Eric Sylvestre BOKOSSA, notre entreprise s'est construite sur plus de deux décennies d'expérience dans l'organisation d'excursions, de circuits et de séjours touristiques au Bénin et à l'international.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Notre mission : offrir des expériences authentiques, respectueuses des cultures locales et inoubliables à chaque voyageur qui nous fait confiance.
                </p>
              </div>
              <div className="relative">
                <img
                  src="[PHOTO HISTOIRE À REMPLACER]"
                  alt="Notre histoire"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Highlight */}
        <section className="py-20 bg-primary relative">
          <div className="absolute inset-0">
            <img
              src="[PHOTO EXPÉRIENCE À REMPLACER]"
              alt="Notre expérience"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/90" />
          </div>
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
            <div className="text-7xl font-heading font-bold mb-4">20+</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              années d'expérience
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-200">
              Deux décennies d'expertise pour vous faire découvrir le meilleur du Bénin
            </p>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Notre fondateur"
            />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="[PHOTO FONDATEUR À REMPLACER]"
                  alt={SITE_CONFIG.founder.name}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div>
                <h3 className="font-heading text-3xl font-bold text-text mb-2">
                  {SITE_CONFIG.founder.name}
                </h3>
                <p className="text-accent font-medium mb-6">{SITE_CONFIG.founder.title}</p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  [BIOGRAPHIE DU FONDATEUR À FOURNIR PAR LE CLIENT]
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Passionné par son pays et sa culture, Eric Sylvestre BOKOSSA a consacré sa vie à faire connaître les trésors du Bénin aux voyageurs du monde entier. Sa vision : un tourisme respectueux, authentique et mémorable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Nos valeurs"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Authenticité", description: "Des expériences vraies et immersives au cœur de la culture béninoise." },
                { title: "Excellence", description: "Un service de qualité irréprochable pour chaque voyageur." },
                { title: "Respect", description: "Respect des cultures, des traditions et de l'environnement." },
                { title: "Hospitalité", description: "Un accueil chaleureux et personnalisé à chaque étape." },
                { title: "Culture", description: "Valorisation et transmission du patrimoine culturel béninois." },
                { title: "Professionnalisme", description: "Une équipe expérimentée et dédiée à votre satisfaction." },
              ].map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <SectionHeading
                subtitle="NOTRE VISION"
                title="Développer le tourisme béninois"
              />
              <p className="text-text-secondary text-xl leading-relaxed mb-8">
                Notre ambition est de contribuer au développement du tourisme au Bénin en faisant découvrir la richesse de notre patrimoine, de notre culture et de nos paysages aux voyageurs du monde entier. Nous croyons en un tourisme durable, respectueux et bénéfique pour les communautés locales.
              </p>
              <Button variant="primary" size="lg" href="/circuits">
                Rejoignez-nous pour une aventure inoubliable
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
