import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Calendar, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px]">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 lg:px-8 pb-12">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-text-secondary text-xl leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="text-text-secondary leading-relaxed">
                  {post.content}
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-12 pt-8 border-t">
                <span className="text-text font-medium">Partager :</span>
                <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                  Copier le lien
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Articles similaires"
            />
            <div className="grid md:grid-cols-3 gap-8">
              {BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                <div key={relatedPost.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">{relatedPost.category}</Badge>
                    <h3 className="font-heading text-lg font-bold text-text mb-2">
                      {relatedPost.title}
                    </h3>
                    <Button variant="outline" size="sm" href={`/blog/${relatedPost.slug}`} className="w-full">
                      Lire l'article
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <SectionHeading
              title="Prêt à découvrir le Bénin ?"
            />
            <p className="text-text-secondary text-xl mb-8 max-w-2xl mx-auto">
              Laissez-nous vous accompagner dans la préparation de votre voyage.
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Planifier mon voyage
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
