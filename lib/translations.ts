export type Locale = "fr" | "en";

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      about: "À propos",
      circuits: "Circuits",
      stays: "Séjours",
      hotels: "Hôtels",
      testimonials: "Témoignages",
      blog: "Blog",
      contact: "Contact",
    },
    // Hero
    hero: {
      subtitle: "EXPLOREZ LE BÉNIN, LE TOGO ET LE GHANA AUTREMENT",
      title: "Découvrez le Bénin, le Togo et le Ghana à travers des expériences authentiques.",
      description: "Avec plus de 20 ans d'expertise, Wonder Tours and Services vous accompagne dans la découverte du patrimoine culturel et naturel du Bénin, du Togo et du Ghana.",
      ctaPrimary: "Découvrir nos circuits",
      ctaSecondary: "Planifier mon voyage",
      video: "Voir la destination",
    },
    // CTA
    cta: {
      ready: "Prêt à découvrir le Bénin, le Togo et le Ghana ?",
      description: "Laissez-nous imaginer avec vous une expérience adaptée à vos envies.",
      planTrip: "Planifier mon voyage",
      contactUs: "Nous contacter",
    },
    // Common
    common: {
      learnMore: "En savoir plus",
      viewAll: "Voir tout",
      readMore: "Lire la suite",
      bookNow: "Réserver",
      requestQuote: "Demander un devis",
      contact: "Contact",
      loading: "Chargement...",
      error: "Une erreur s'est produite",
      success: "Succès",
    },
    // Header
    header: {
      planTrip: "Planifier mon voyage",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      circuits: "Tours",
      stays: "Stays",
      hotels: "Hotels",
      testimonials: "Testimonials",
      blog: "Blog",
      contact: "Contact",
    },
    // Hero
    hero: {
      subtitle: "EXPLORE BENIN, TOGO AND GHANA DIFFERENTLY",
      title: "Discover Benin, Togo and Ghana through authentic experiences.",
      description: "With over 20 years of expertise, Wonder Tours and Services accompanies you in discovering Benin's, Togo's and Ghana's cultural and natural heritage.",
      ctaPrimary: "Discover our tours",
      ctaSecondary: "Plan my trip",
      video: "See the destination",
    },
    // CTA
    cta: {
      ready: "Ready to discover Benin, Togo and Ghana?",
      description: "Let us imagine an experience tailored to your desires.",
      planTrip: "Plan my trip",
      contactUs: "Contact us",
    },
    // Common
    common: {
      learnMore: "Learn more",
      viewAll: "View all",
      readMore: "Read more",
      bookNow: "Book now",
      requestQuote: "Request a quote",
      contact: "Contact",
      loading: "Loading...",
      error: "An error occurred",
      success: "Success",
    },
    // Header
    header: {
      planTrip: "Plan my trip",
    },
  },
} as const;

export function getTranslation(locale: Locale = "fr") {
  return translations[locale];
}
