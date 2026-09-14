import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LocalizedHero } from "@/components/common/localized-hero";
import { BlogPageContent } from "@/components/blog/blog-page-content";
import { listBlogPosts, listBlogCategories } from "@/lib/services/blog";
import { toBlogPostVM } from "@/lib/view-models";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Blog - Wonder Tours and Services",
  description: "Carnet de voyage : conseils, culture et actualités pour préparer votre découverte du Bénin. Articles sur le tourisme, la culture et les destinations.",
  path: "/blog"
});

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Filtre via l'URL (?categorie=slug) ; la pagination reste côté client
  // dans BlogGrid (6 articles par page).
  const filters = await searchParams;
  const categorySlug =
    typeof filters.categorie === "string" ? filters.categorie : "";

  const [postsPage, categoriesPage] = await Promise.all([
    listBlogPosts({
      published: true,
      pageSize: 100,
      ...(categorySlug && { categorySlug }),
    }),
    listBlogCategories({ active: true }),
  ]);
  const posts = postsPage.items.map(toBlogPostVM);
  const categories = categoriesPage.items;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <LocalizedHero
          subtitle="CARNET DE VOYAGE"
          titleFr="Conseils, culture et actualités"
          titleEn="Tips, culture and news"
          descriptionFr="Découvrez nos articles pour préparer votre voyage au Bénin : conseils pratiques, découvertes culturelles et inspirations."
          descriptionEn="Discover our articles to prepare your trip to Benin: practical tips, cultural discoveries and inspirations."
          ctaFr="Explorer les articles"
          ctaEn="Explore articles"
          ctaHref="#articles"
          image="[PHOTO HERO BLOG À REMPLACER]"
        />

        {/* Corps bilingue (catégories, articles, newsletter) */}
        <BlogPageContent
          categorySlug={categorySlug}
          categories={categories}
          posts={posts}
        />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
