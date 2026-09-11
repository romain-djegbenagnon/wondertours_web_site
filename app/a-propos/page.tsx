import { AboutContent } from "@/components/about/about-content";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "À propos - Wonder Tours and Services",
  description: "Découvrez Wonder Tours and Services, plus de 20 ans d'expertise touristique au Bénin. Notre histoire, nos valeurs et notre vision du tourisme authentique.",
  path: "/a-propos"
});

export default function AboutPage() {
  return <AboutContent />;
}
