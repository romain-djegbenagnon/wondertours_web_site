import { HomeContent } from "@/components/home/home-content";
import { listCircuits } from "@/lib/services/circuits";
import { listTestimonials } from "@/lib/services/testimonials";
import { listBlogPosts } from "@/lib/services/blog";
import { listServices } from "@/lib/services/services";
import { listDestinations } from "@/lib/services/destinations";
import { toCircuitVM, toTestimonialVM, toBlogPostVM } from "@/lib/view-models";
import { generateMetadata } from "@/lib/seo";

// Contenu issu de la base (circuits, témoignages, articles, services) :
// rendu dynamique pour refléter les modifications du dashboard, sinon
// la page serait figée au build (pré-rendu statique) sur Vercel.
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "Wonder Tours and Services - Tourisme au Bénin",
  description: "Découvrez le Bénin avec Wonder Tours and Services. Plus de 20 ans d'expertise en circuits touristiques, excursions et séjours authentiques.",
  path: "/"
});

export default async function Home() {
  // Rendu dynamique : données fraîches de la base à chaque requête.
  const [circuitsPage, testimonialsPage, postsPage, services, destinations] =
    await Promise.all([
      listCircuits({ active: true, pageSize: 6 }),
      listTestimonials({ active: true }),
      listBlogPosts({ published: true, pageSize: 3 }),
      listServices({ active: true }),
      listDestinations({ active: true }),
    ]);

  // Les view-models (strings, numbers) sont sérialisables : ils peuvent
  // traverser la frontière serveur → client (HomeContent est client car
  // la locale vit dans un contexte React client).
  const circuits = circuitsPage.items.map(toCircuitVM);
  const testimonials = testimonialsPage.items.map(toTestimonialVM);
  const posts = postsPage.items.map(toBlogPostVM);
  const serviceVMs = services.items.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description ?? "",
    icon: service.icon ?? "Map",
    href: service.href ?? "/contact",
  }));
  const destinationVMs = destinations.items.map((destination) => ({
    id: destination.id,
    name: destination.name,
  }));

  return (
    <HomeContent
      circuits={circuits}
      testimonials={testimonials}
      posts={posts}
      services={serviceVMs}
      destinations={destinationVMs}
    />
  );
}
