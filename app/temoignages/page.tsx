import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LocalizedHero } from "@/components/common/localized-hero";
import { TestimonialsPageContent } from "@/components/testimonials/testimonials-page-content";
import { listTestimonials } from "@/lib/services/testimonials";
import { toTestimonialVM } from "@/lib/view-models";
import { generateMetadata } from "@/lib/seo";

// Témoignages issus de la base : rendu dynamique pour refléter les
// modifications du dashboard (sinon figé au build sur Vercel).
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Témoignages - Wonder Tours and Services",
  description: "Découvrez les témoignages de nos voyageurs au Bénin, au Togo et au Ghana. Des expériences authentiques et inoubliables avec Wonder Tours and Services.",
  path: "/temoignages"
});

interface TestimonialsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TestimonialsPage({ searchParams }: TestimonialsPageProps) {
  const filters = await searchParams;
  const page = typeof filters.page === "string" ? parseInt(filters.page, 10) : 1;
  const pageSize = 6;

  const testimonialsPage = await listTestimonials({ active: true, page, pageSize });
  const testimonials = testimonialsPage.items.map(toTestimonialVM);

  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
      : 0;

  const totalPages = Math.ceil(testimonialsPage.total / pageSize);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <LocalizedHero
          subtitle="TÉMOIGNAGES"
          titleFr="Des voyages qui laissent des souvenirs"
          titleEn="Trips that leave memories"
          descriptionFr="Découvrez les expériences de nos voyageurs et laissez-vous inspirer pour votre prochaine aventure au Bénin, au Togo ou au Ghana."
          descriptionEn="Discover our travelers' experiences and get inspired for your next adventure in Benin, Togo or Ghana."
          ctaFr="Partager mon expérience"
          ctaEn="Share my experience"
          ctaHref="/contact"
          image="/photos_site wonder_tours/IMG-20260805-WA0055.jpg"
        />

        {/* Corps bilingue (stats, grille, CTA) */}
        <TestimonialsPageContent
          testimonials={testimonials}
          averageRating={averageRating}
          currentPage={page}
          totalPages={totalPages}
          totalTestimonials={testimonialsPage.total}
        />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
