import { translateText, isDeepLConfigured } from './services/deepl';

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
      subtitle: "EXPLOREZ LE BÉNIN AUTREMENT",
      title: "Découvrez le Bénin à travers des expériences authentiques.",
      description: "Avec plus de 20 ans d'expertise, Wonder Tours and Services vous accompagne dans la découverte du patrimoine culturel et naturel du Bénin.",
      ctaPrimary: "Découvrir nos circuits",
      ctaSecondary: "Planifier mon voyage",
      video: "Voir la destination",
    },
    // CTA
    cta: {
      ready: "Prêt à découvrir le Bénin ?",
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
      subtitle: "EXPLORE BENIN DIFFERENTLY",
      title: "Discover Benin through authentic experiences.",
      description: "With over 20 years of expertise, Wonder Tours and Services accompanies you in discovering Benin's cultural and natural heritage.",
      ctaPrimary: "Discover our tours",
      ctaSecondary: "Plan my trip",
      video: "See the destination",
    },
    // CTA
    cta: {
      ready: "Ready to discover Benin?",
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

/**
 * Traduit un texte dynamiquement en utilisant DeepL
 * @param text - Texte à traduire
 * @param targetLocale - Langue cible
 * @returns Texte traduit ou texte original si DeepL n'est pas configuré
 */
export async function translateDynamicText(
  text: string,
  targetLocale: Locale
): Promise<string> {
  // Si DeepL n'est pas configuré, retourne le texte original
  if (!isDeepLConfigured()) {
    console.warn('DeepL API key not configured. Using original text.');
    return text;
  }

  try {
    const targetLang = targetLocale === 'en' ? 'en-US' : 'fr';
    return await translateText(text, targetLang);
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text on error
  }
}

/**
 * Traduit un objet de traductions dynamiquement
 * @param obj - Objet avec des textes à traduire
 * @param targetLocale - Langue cible
 * @returns Objet avec les textes traduits
 */
export async function translateDynamicObject<T extends Record<string, any>>(
  obj: T,
  targetLocale: Locale
): Promise<T> {
  if (!isDeepLConfigured()) {
    return obj;
  }

  const translatedObj: Record<string, any> = { ...obj };

  for (const key in translatedObj) {
    if (typeof translatedObj[key] === 'string') {
      translatedObj[key] = await translateDynamicText(
        translatedObj[key],
        targetLocale
      );
    } else if (typeof translatedObj[key] === 'object' && translatedObj[key] !== null) {
      translatedObj[key] = await translateDynamicObject(
        translatedObj[key],
        targetLocale
      );
    }
  }

  return translatedObj as T;
}
