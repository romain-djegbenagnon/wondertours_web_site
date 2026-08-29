export const SITE_CONFIG = {
  name: "Wonder Tours and Services",
  description: "Découvrez le Bénin à travers des expériences authentiques avec plus de 20 ans d'expertise touristique.",
  url: "https://wondertours.bj",
  ogImage: "/og-image.jpg",
  links: {
    whatsapp: "https://wa.me/22990000000",
    facebook: "https://facebook.com/wondertours",
    instagram: "https://instagram.com/wondertours",
    youtube: "https://youtube.com/@wondertours",
  },
  contact: {
    email: "contact@wondertours.bj",
    phone: "+229 97 00 00 00",
    address: "Ouidah, Bénin",
  },
  founder: {
    name: "Eric Sylvestre BOKOSSA",
    title: "Fondateur",
  },
} as const;

export const NAVIGATION = [
  { name: "Accueil", nameEn: "Home", href: "/" },
  { name: "À propos", nameEn: "About", href: "/a-propos" },
  { name: "Circuits", nameEn: "Tours", href: "/circuits" },
  { name: "Séjours", nameEn: "Stays", href: "/sejours" },
  { name: "Hôtels", nameEn: "Hotels", href: "/hotels" },
  { name: "Témoignages", nameEn: "Testimonials", href: "/temoignages" },
  { name: "Blog", nameEn: "Blog", href: "/blog" },
  { name: "Contact", nameEn: "Contact", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: 1,
    title: "Circuits touristiques",
    description: "Découvrez le Bénin à travers des circuits soigneusement conçus.",
    icon: "Map",
    href: "/circuits",
  },
  {
    id: 2,
    title: "Organisation de séjours",
    description: "Une prise en charge adaptée à votre voyage.",
    icon: "Calendar",
    href: "/sejours",
  },
  {
    id: 3,
    title: "Réservation d'hôtels",
    description: "Trouvez et réservez votre hébergement avec assistance.",
    icon: "Building2",
    href: "/hotels",
  },
  {
    id: 4,
    title: "Accompagnement touristique",
    description: "Bénéficiez de conseils et d'un accompagnement personnalisé.",
    icon: "User",
    href: "/contact",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "20+ ans d'expérience",
    description: "Une expertise construite au fil de nombreuses années.",
  },
  {
    id: 2,
    title: "Expériences authentiques",
    description: "Découvrir le pays au-delà des parcours touristiques classiques.",
  },
  {
    id: 3,
    title: "Accompagnement personnalisé",
    description: "Des solutions adaptées aux besoins de chaque voyageur.",
  },
  {
    id: 4,
    title: "Expertise locale",
    description: "Une connaissance approfondie des destinations et du patrimoine béninois.",
  },
] as const;

export const DESTINATIONS = [
  "Ouidah",
  "Abomey",
  "Porto-Novo",
  "Cotonou",
  "Ganvié",
  "Grand-Popo",
] as const;

export const CATEGORIES = [
  "Culture",
  "Histoire",
  "Patrimoine",
  "Nature",
  "Vodoun",
  "Littoral",
  "Expérience locale",
] as const;
