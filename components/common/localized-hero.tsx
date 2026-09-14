"use client";

import { Hero } from "@/components/hero/hero";
import { useLanguage } from "@/contexts/language-context";

interface LocalizedHeroProps {
  subtitle: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  ctaFr: string;
  ctaEn: string;
  ctaHref: string;
  secondaryCtaFr?: string;
  secondaryCtaEn?: string;
  secondaryCtaHref?: string;
  image: string;
}

/**
 * Hero bilingue : le rendu serveur ne peut pas lire la locale (contexte
 * client), ce petit composant client fait le pont entre les deux.
 */
export function LocalizedHero({
  subtitle,
  titleFr,
  titleEn,
  descriptionFr,
  descriptionEn,
  ctaFr,
  ctaEn,
  ctaHref,
  secondaryCtaFr,
  secondaryCtaEn,
  secondaryCtaHref,
  image,
}: LocalizedHeroProps) {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <Hero
      subtitle={subtitle}
      title={isFr ? titleFr : titleEn}
      description={isFr ? descriptionFr : descriptionEn}
      primaryCta={{ text: isFr ? ctaFr : ctaEn, href: ctaHref }}
      secondaryCta={secondaryCtaFr && secondaryCtaEn && secondaryCtaHref ? { text: isFr ? secondaryCtaFr : secondaryCtaEn, href: secondaryCtaHref } : undefined}
      image={image}
    />
  );
}
