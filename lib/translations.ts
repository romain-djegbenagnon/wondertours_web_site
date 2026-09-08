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
    // Contact Page
    contact: {
      hero: {
        title: "Contactez-nous",
        subtitle: "Nous sommes là pour répondre à toutes vos questions",
      },
      form: {
        title: "Envoyez-nous un message",
        name: "Nom complet",
        email: "Email",
        phone: "Téléphone",
        subject: "Sujet",
        requestType: "Type de demande",
        travelDate: "Date de voyage souhaitée",
        travelers: "Nombre de voyageurs",
        message: "Message",
        submit: "Envoyer le message",
        sending: "Envoi en cours...",
        sent: "Message envoyé avec succès !",
        sendAnother: "Envoyer un autre message",
      },
      requestTypes: {
        information: "Demande d'information",
        booking: "Réservation",
        quote: "Demande de devis",
        partnership: "Partenariat",
        other: "Autre",
      },
      info: {
        title: "Nos informations de contact",
        address: "Adresse",
        phone: "Téléphone",
        email: "Email",
      },
      location: {
        title: "Notre localisation",
      },
      whatsapp: {
        title: "Préférez WhatsApp ?",
        description: "Contactez-nous directement via WhatsApp pour une réponse rapide.",
        button: "Discuter sur WhatsApp",
      },
    },
    // About Page
    about: {
      hero: {
        title: "À propos de nous",
        subtitle: "Plus de 20 ans d'expertise touristique au Bénin",
      },
    },
    // Circuits Page
    circuits: {
      hero: {
        title: "Nos circuits",
        subtitle: "Découvrez nos expériences touristiques uniques",
      },
    },
    // Blog Page
    blog: {
      hero: {
        title: "Notre blog",
        subtitle: "Découvrez nos articles et guides touristiques",
      },
    },
    // Testimonials Page
    testimonials: {
      hero: {
        title: "Témoignages",
        subtitle: "Ce que nos clients disent de nous",
      },
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
    // Contact Page
    contact: {
      hero: {
        title: "Contact us",
        subtitle: "We are here to answer all your questions",
      },
      form: {
        title: "Send us a message",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        requestType: "Request type",
        travelDate: "Preferred travel date",
        travelers: "Number of travelers",
        message: "Message",
        submit: "Send message",
        sending: "Sending...",
        sent: "Message sent successfully!",
        sendAnother: "Send another message",
      },
      requestTypes: {
        information: "Information request",
        booking: "Booking",
        quote: "Quote request",
        partnership: "Partnership",
        other: "Other",
      },
      info: {
        title: "Our contact information",
        address: "Address",
        phone: "Phone",
        email: "Email",
      },
      location: {
        title: "Our location",
      },
      whatsapp: {
        title: "Prefer WhatsApp?",
        description: "Contact us directly via WhatsApp for a quick response.",
        button: "Chat on WhatsApp",
      },
    },
    // About Page
    about: {
      hero: {
        title: "About us",
        subtitle: "Over 20 years of tourism expertise in Benin",
      },
    },
    // Circuits Page
    circuits: {
      hero: {
        title: "Our tours",
        subtitle: "Discover our unique tourism experiences",
      },
    },
    // Blog Page
    blog: {
      hero: {
        title: "Our blog",
        subtitle: "Discover our articles and travel guides",
      },
    },
    // Testimonials Page
    testimonials: {
      hero: {
        title: "Testimonials",
        subtitle: "What our clients say about us",
      },
    },
  },
} as const;

export function getTranslation(locale: Locale = "fr") {
  return translations[locale];
}
