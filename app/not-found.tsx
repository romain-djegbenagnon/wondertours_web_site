import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary mb-6">
              404
            </h1>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
              Cette destination semble introuvable
            </h2>
            <p className="text-text-secondary text-xl mb-8">
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/">
                Retour à l'accueil
              </Button>
              <Button variant="outline" size="lg" href="/circuits">
                Découvrir nos circuits
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
