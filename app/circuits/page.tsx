import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LocalizedHero } from "@/components/common/localized-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { CircuitsExplorer } from "@/components/circuits/circuits-explorer";
import { listCircuits } from "@/lib/services/circuits";
import { listDestinations } from "@/lib/services/destinations";
import { listCategories } from "@/lib/services/categories";
import { toCircuitVM } from "@/lib/view-models";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Circuits touristiques au Bénin - Wonder Tours and Services",
  description: "Explorez nos circuits touristiques au Bénin : Ouidah, Abomey, Ganvié, Grand-Popo, Porto-Novo. Circuits culturels, historiques et nature.",
  path: "/circuits"
});

interface CircuitsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CircuitsPage({ searchParams }: CircuitsPageProps) {
  // Filtre initial via l'URL (?category=slug), le filtrage interactif
  // reste côté client dans le composant explorateur.
  const filters = await searchParams;
  const initialCategorySlug =
    typeof filters.category === "string" ? filters.category : "";

  const [circuitsPage, destinationsPage, categoriesPage] = await Promise.all([
    listCircuits({ active: true, pageSize: 100 }),
    listDestinations({ active: true }),
    listCategories({ active: true }),
  ]);

  const circuits = circuitsPage.items.map(toCircuitVM);

  // Le composant client filtre par nom de catégorie/destination : on
  // transmet les slugs et noms pour la correspondance.
  const categoryNames = new Map(
    categoriesPage.items.map((c) => [c.slug, c.name])
  );
  const destinationNames = new Map(
    destinationsPage.items.map((d) => [d.slug, d.name])
  );

  // Résout le paramètre ?category= vers le nom affiché ; "all" si absent
  // ou inconnu (valeur neutre du composant client).
  const initialCategoryName = initialCategorySlug
    ? categoryNames.get(initialCategorySlug) ?? "all"
    : "all";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <LocalizedHero
          subtitle="NOS CIRCUITS"
          titleFr="Explorez nos circuits touristiques"
          titleEn="Explore our tourist circuits"
          descriptionFr="Découvrez le Bénin à travers nos circuits soigneusement conçus pour vous offrir des expériences authentiques et inoubliables."
          descriptionEn="Discover Benin through our carefully designed circuits to offer you authentic and unforgettable experiences."
          ctaFr="Demander un devis"
          ctaEn="Request a quote"
          ctaHref="/contact"
          image="[PHOTO HERO CIRCUITS À REMPLACER]"
        />

        {/* Filtres + grille (composant client) */}
        <CircuitsExplorer
          circuits={circuits}
          categories={[...categoryNames.values()]}
          destinations={[...destinationNames.values()]}
          initialCategory={initialCategoryName}
        />

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <SectionHeading
              title="Vous ne trouvez pas ce que vous cherchez ?"
            />
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Nous pouvons créer un circuit personnalisé adapté à vos envies et à votre budget.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Demander un circuit sur mesure
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
