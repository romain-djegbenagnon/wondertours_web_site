import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Calendar, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

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
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
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

                {/* Comments Section */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="font-heading text-2xl font-bold text-text mb-6">
                    Laisser un commentaire
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-text mb-2">
                        Commentaire
                      </label>
                      <textarea
                        id="comment"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                        placeholder="Votre commentaire..."
                      />
                    </div>
                    <Button variant="primary" type="submit">
                      Envoyer le commentaire
                    </Button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-8">
                {/* Recent Posts */}
                <div className="bg-background p-6 rounded-xl">
                  <h3 className="font-heading text-xl font-bold text-text mb-4">
                    Articles récents
                  </h3>
                  <div className="space-y-4">
                    {BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 5).map((recentPost) => (
                      <Link
                        key={recentPost.id}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <img
                            src={recentPost.image}
                            alt={recentPost.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium text-text text-sm group-hover:text-primary transition-colors line-clamp-2">
                              {recentPost.title}
                            </h4>
                            <p className="text-text-secondary text-xs mt-1">
                              {new Date(recentPost.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-background p-6 rounded-xl">
                  <h3 className="font-heading text-xl font-bold text-text mb-4">
                    Catégories
                  </h3>
                  <div className="space-y-2">
                    {Array.from(new Set(BLOG_POSTS.map((p) => p.category))).map((category) => (
                      <Link
                        key={category}
                        href={`/blog?category=${category}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-primary/10 transition-colors group"
                      >
                        <span className="text-text-secondary group-hover:text-primary transition-colors">
                          {category}
                        </span>
                        <span className="text-text-secondary text-sm">
                          {BLOG_POSTS.filter((p) => p.category === category).length}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
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
