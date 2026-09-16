import { SejoursContent } from "@/components/sejours/sejours-content";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Organisation de séjours - Wonder Tours and Services",
  description: "Créez votre séjour sur mesure au Bénin, au Togo ou au Ghana avec Wonder Tours and Services. Organisation personnalisée, transport, hébergement et accompagnement.",
  path: "/sejours"
});

export default function SejoursPage() {
  return <SejoursContent />;
}
