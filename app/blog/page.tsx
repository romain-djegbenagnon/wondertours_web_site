"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/data/blog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(BLOG_POSTS.length / postsPerPage);

  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return BLOG_POSTS.slice(startIndex, endIndex);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <Hero
          subtitle="CARNET DE VOYAGE"
          title="Conseils, culture et actualités"
          description="Découvrez nos articles pour préparer votre voyage au Bénin : conseils pratiques, découvertes culturelles et inspirations."
          primaryCta={{ text: "Explorer les articles", href: "#articles" }}
          image="[PHOTO HERO BLOG À REMPLACER]"
        />

        {/* Categories */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {["Tous", "Voyage", "Culture", "Patrimoine", "Vodoun", "Conseils", "Destinations"].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full font-medium transition-colors bg-gray-100 text-text hover:bg-gray-200"
                >
                  {category}
                </button>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCurrentPosts().map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="rounded-full px-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Précédent
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => goToPage(index + 1)}
                      className={`w-10 h-10 rounded-full font-medium transition-all ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-white text-text hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="rounded-full px-4"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
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
              <Button variant="primary">S'inscrire</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
