import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LocalizedHero } from "@/components/common/localized-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialsContent } from "@/components/testimonials/testimonials-content";
import { Button } from "@/components/ui/button";
import { listTestimonials } from "@/lib/services/testimonials";
import { toTestimonialVM } from "@/lib/view-models";
import { Star } from "lucide-react";
import { generateMetadata } from "@/lib/seo";

// Témoignages issus de la base : rendu dynamique pour refléter les
// modifications du dashboard (sinon figé au build sur Vercel).
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Témoignages - Wonder Tours and Services",
  description: "Découvrez les témoignages de nos voyageurs au Bénin. Des expériences authentiques et inoubliables avec Wonder Tours and Services.",
  path: "/temoignages"
});

export default async function TestimonialsPage() {
  const testimonialsPage = await listTestimonials({ active: true });
  const testimonials = testimonialsPage.items.map(toTestimonialVM);

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <LocalizedHero
          subtitle="TÉMOIGNAGES"
          titleFr="Des voyages qui laissent des souvenirs"
          titleEn="Trips that leave memories"
          descriptionFr="Découvrez les expériences de nos voyageurs et laissez-vous inspirer pour votre prochaine aventure au Bénin."
          descriptionEn="Discover our travelers' experiences and get inspired for your next adventure in Benin."
          ctaFr="Partager mon expérience"
          ctaEn="Share my experience"
          ctaHref="/contact"
          image="[PHOTO HERO TÉMOIGNAGES À REMPLACER]"
        />

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-heading font-bold text-primary mb-2">
                  {testimonials.length}
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
                <p className="text-text-secondary">Années d&apos;expérience</p>
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
            <TestimonialsContent testimonials={testimonials} />
            {testimonials.length === 0 && (
              <p className="text-center text-text-secondary py-12">
                Aucun témoignage pour le moment.
              </p>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <SectionHeading
              title="Vous avez voyagé avec nous ?"
            />
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Partagez votre expérience et aidez d&apos;autres voyageurs à découvrir le Bénin avec Wonder Tours.
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
