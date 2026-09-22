import { AboutContent } from "@/components/about/about-content";
import { generateMetadata } from "@/lib/seo";
import { getSetting } from "@/lib/services/settings";

// La biographie du fondateur vient de la table settings (éditable dans le
// dashboard) → rendu dynamique, pas de requête au build.
export const dynamic = "force-dynamic";

export const metadata = generateMetadata({
  title: "À propos - Wonder Tours and Services",
  description: "Découvrez Wonder Tours and Services, plus de 20 ans d'expertise touristique au Bénin, au Togo et au Ghana. Notre histoire, nos valeurs et notre vision du tourisme authentique.",
  path: "/a-propos"
});

export default async function AboutPage() {
  const [founderBioFr, founderBioEn] = await Promise.all([
    getSetting("founder_bio_fr"),
    getSetting("founder_bio_en"),
  ]);

  return (
    <AboutContent
      founderBioFr={founderBioFr?.trim() || null}
      founderBioEn={founderBioEn?.trim() || null}
    />
  );
}
