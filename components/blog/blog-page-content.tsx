"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { BlogGrid } from "@/components/blog/blog-grid";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/data/blog";

interface BlogCategoryVM {
  id: string;
  name: string;
  slug: string;
}

interface BlogPageContentProps {
  categorySlug: string;
  categories: BlogCategoryVM[];
  posts: BlogPost[];
}

/**
 * Corps bilingue de la page Blog (catégories, articles, newsletter). Le
 * rendu serveur ne peut pas lire la locale (contexte client) : la page
 * serveur garde le fetch des données et délègue l'affichage ici.
 */
export function BlogPageContent({
  categorySlug,
  categories,
  posts,
}: BlogPageContentProps) {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <>
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
              {isFr ? "Tous" : "All"}
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
            title={isFr ? "Derniers articles" : "Latest articles"}
          />
          <BlogGrid posts={posts} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <SectionHeading
            title={isFr ? "Restez informé" : "Stay informed"}
          />
          <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
            {isFr
              ? "Recevez nos derniers articles et conseils pour préparer votre voyage au Bénin, au Togo ou au Ghana."
              : "Get our latest articles and tips to prepare your trip to Benin, Togo or Ghana."}
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder={isFr ? "Votre email" : "Your email"}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:outline-none"
            />
            <Button variant="primary">
              {isFr ? "S'inscrire" : "Subscribe"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
