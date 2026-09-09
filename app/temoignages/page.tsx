import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { Star } from "lucide-react";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Témoignages - Wonder Tours and Services",
  description: "Découvrez les témoignages de nos voyageurs au Bénin. Des expériences authentiques et inoubliables avec Wonder Tours and Services.",
  path: "/temoignages"
});

export default function TestimonialsPage() {
  const averageRating = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0) / TESTIMONIALS.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <Hero
          subtitle="TÉMOIGNAGES"
          title="Des voyages qui laissent des souvenirs"
          description="Découvrez les expériences de nos voyageurs et laissez-vous inspirer pour votre prochaine aventure au Bénin."
          primaryCta={{ text: "Partager mon expérience", href: "/contact" }}
          image="[PHOTO HERO TÉMOIGNAGES À REMPLACER]"
        />

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-heading font-bold text-primary mb-2">
                  {TESTIMONIALS.length}
                </div>
                <p className="text-text-secondary">Témoignages</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-5xl font-heading font-bold text-primary">
                    {averageRating.toFixed(1)}
                  </span>
                  <Star className="w-8 h-8 fill-secondary text-secondary" />
                </div>
                <p className="text-text-secondary">Note moyenne</p>
              </div>
              <div>
                <div className="text-5xl font-heading font-bold text-primary mb-2">
                  20+
                </div>
                <p className="text-text-secondary">Années d'expérience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Ils ont voyagé avec Wonder Tours"
            />
            <TestimonialsContent />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <SectionHeading
              title="Vous avez voyagé avec nous ?"
            />
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Partagez votre expérience et aidez d'autres voyageurs à découvrir le Bénin avec Wonder Tours.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Partager mon témoignage
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
