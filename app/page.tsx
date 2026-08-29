import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Hero } from "@/components/hero/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { CircuitCard } from "@/components/circuits/circuit-card";
import { ServiceCard } from "@/components/services/service-card";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { CIRCUITS } from "@/lib/data/circuits";
import { SERVICES } from "@/lib/constants";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { BLOG_POSTS } from "@/lib/data/blog";
import { WHY_CHOOSE_US, DESTINATIONS } from "@/lib/constants";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Wonder Tours and Services - Tourisme au Bénin",
  description: "Découvrez le Bénin avec Wonder Tours and Services. Plus de 20 ans d'expertise en circuits touristiques, excursions et séjours authentiques.",
  path: "/"
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          subtitle="EXPLOREZ LE BÉNIN AUTREMENT"
          title="Découvrez le Bénin à travers<br />des expériences authentiques."
          description="Avec plus de 20 ans d'expertise, Wonder Tours and Services vous accompagne dans la découverte du patrimoine culturel et naturel du Bénin."
          primaryCta={{ text: "Découvrir nos circuits", href: "/circuits" }}
          secondaryCta={{ text: "Planifier mon voyage", href: "/contact" }}
          image="[PHOTO HERO BÉNIN À REMPLACER]"
        />

        {/* Experience Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-6xl font-heading font-bold text-primary mb-4">20+</div>
                <h2 className="font-heading text-3xl font-bold text-text mb-4">
                  années d'expérience
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Une expertise construite au fil de nombreuses années d'accompagnement de voyageurs du monde entier dans la découverte du Bénin.
                </p>
              </div>
              <div className="relative">
                <img
                  src="[PHOTO EXPÉRIENCE À REMPLACER]"
                  alt="Notre équipe"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Circuits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              subtitle="Nos expériences incontournables"
              title="Découvrez les destinations qui font la richesse du Bénin"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CIRCUITS.slice(0, 6).map((circuit) => (
                <CircuitCard key={circuit.id} circuit={circuit} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" href="/circuits">
                Voir tous les circuits
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Voyagez avec une équipe qui connaît le Bénin"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {WHY_CHOOSE_US.map((item, index) => (
                <div key={item.id} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Destination Benin Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0">
            <img
              src="[PHOTO DESTINATION BÉNIN À REMPLACER]"
              alt="Le Bénin"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
            <SectionHeading
              title="Le Bénin vous attend"
              className="text-white"
            />
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              D'Ouidah à Abomey, de Porto-Novo à Ganvié, découvrez un pays riche en histoire, en culture et en paysages exceptionnels.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {DESTINATIONS.map((destination) => (
                <span
                  key={destination}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                >
                  {destination}
                </span>
              ))}
            </div>
            <Button variant="primary" size="lg" href="/circuits">
              Explorer le Bénin
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Nos services touristiques"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  href={service.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Vodoun/Culture Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <SectionHeading
                  subtitle="PATRIMOINE ET CULTURE"
                  title="À la rencontre du patrimoine et de la culture béninoise"
                  align="left"
                />
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Le Bénin est le berceau du Vodoun, une religion ancestrale reconnue patrimoine culturel immatériel de l'UNESCO. Découvrez temples, cérémonies et traditions avec respect et authenticité.
                </p>
                <Button variant="primary" href="/circuits?category=Vodoun">
                  Découvrir nos expériences culturelles
                </Button>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="[PHOTO VODOUN/CULTURE À REMPLACER]"
                  alt="Culture Vodoun"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              title="Ils ont voyagé avec Wonder Tours"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" href="/temoignages">
                Voir tous les témoignages
              </Button>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading
              subtitle="CARNET DE VOYAGE"
              title="Conseils, culture et actualités"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" href="/blog">
                Voir toutes les actualités
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-primary relative">
          <div className="absolute inset-0">
            <img
              src="[PHOTO CTA À REMPLACER]"
              alt="Circuit Bénin"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/90" />
          </div>
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Prêt à découvrir le Bénin ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Laissez-nous imaginer avec vous une expérience adaptée à vos envies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/contact">
                Planifier mon voyage
              </Button>
              <Button variant="outline" size="lg" href="/contact" className="border-white text-white hover:bg-white hover:text-primary">
                Nous contacter
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
