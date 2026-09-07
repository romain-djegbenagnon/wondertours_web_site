import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { LocalizedHero } from "@/components/common/localized-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BlogGrid } from "@/components/blog/blog-grid";
import { listBlogPosts, listBlogCategories } from "@/lib/services/blog";
import { toBlogPostVM } from "@/lib/view-models";
import { generateMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

        {/* Categories */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/blog"
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-colors",
                  categorySlug
                    ? "bg-gray-100 text-text hover:bg-gray-200"
                    : "bg-primary text-white"
                )}
              >
                Tous
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?categorie=${encodeURIComponent(category.slug)}`}
                  className={cn(
                    "px-4 py-2 rounded-full font-medium transition-colors",
                    categorySlug === category.slug
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text hover:bg-gray-200"
                  )}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section id="articles" className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Derniers articles"
            />
            <BlogGrid posts={posts} />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <SectionHeading
              title="Restez informé"
            />
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Recevez nos derniers articles et conseils pour préparer votre voyage au Bénin.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
              />
              <Button variant="primary">S&apos;inscrire</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
