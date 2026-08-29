export interface Circuit {
  id: string;
  slug: string;
  title: string;
  destination: string;
  category: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  included: string[];
  excluded: string[];
}

export const CIRCUITS: Circuit[] = [
  {
    id: "1",
    slug: "decouverte-ouidah",
    title: "Découverte d'Ouidah et de son histoire",
    destination: "Ouidah",
    category: "Histoire",
    duration: "1 jour",
    price: 45000,
    image: "[PHOTO CIRCUIT OUIDAH À REMPLACER]",
    description: "Plongez dans l'histoire fascinante d'Ouidah, ancien port de traite et berceau du Vodoun. Visitez la Route des Esclaves, le Temple des Pythons et le Musée d'Histoire d'Ouidah.",
    highlights: [
      "Route des Esclaves",
      "Temple des Pythons",
      "Musée d'Histoire d'Ouidah",
      "Forêt sacrée de Kpassé",
      "Plage d'Ouidah"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée et exploration",
        description: "Accueil à Ouidah, visite de la Route des Esclaves et du Temple des Pythons. Déjeuner local et après-midi au Musée d'Histoire."
      }
    ],
    included: [
      "Transport",
      "Guide francophone",
      "Entrées aux sites",
      "Déjeuner"
    ],
    excluded: [
      "Dépenses personnelles",
      "Pourboires"
    ]
  },
  {
    id: "2",
    slug: "royaumes-abomey",
    title: "Les Royaumes d'Abomey",
    destination: "Abomey",
    category: "Histoire",
    duration: "2 jours",
    price: 85000,
    image: "[PHOTO CIRCUIT ABOMEY À REMPLACER]",
    description: "Découvrez l'ancien capitale du royaume du Dahomey et ses palais royaux classés à l'UNESCO. Une immersion dans l'histoire des rois d'Abomey.",
    highlights: [
      "Palais royaux d'Abomey (UNESCO)",
      "Musée Historique d'Abomey",
      "Artisanat local",
      "Culture traditionnelle"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Abomey",
        description: "Transfert depuis Cotonou, installation et visite des palais royaux."
      },
      {
        day: 2,
        title: "Musée et artisanat",
        description: "Visite du Musée Historique, découverte de l'artisanat local et retour."
      }
    ],
    included: [
      "Transport",
      "Hébergement 1 nuit",
      "Guide francophone",
      "Petit-déjeuner",
      "Entrées aux sites"
    ],
    excluded: [
      "Déjeuners et dîners",
      "Dépenses personnelles"
    ]
  },
  {
    id: "3",
    slug: "ganvie-village-lacustre",
    title: "Village lacustre de Ganvié",
    destination: "Ganvié",
    category: "Culture",
    duration: "1 jour",
    price: 55000,
    image: "[PHOTO CIRCUIT GANVIÉ À REMPLACER]",
    description: "Explorez la Venise de l'Afrique, un village entièrement construit sur pilotis au milieu du lac Nokoué. Une expérience culturelle unique.",
    highlights: [
      "Balade en pirogue",
      "Vie sur le lac",
      "Culture Tofinu",
      "Marché flottant"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journée à Ganvié",
        description: "Transfert depuis Cotonou, balade en pirogue, déjeuner sur le lac et retour."
      }
    ],
    included: [
      "Transport",
      "Pirogue",
      "Guide francophone",
      "Déjeuner"
    ],
    excluded: [
      "Dépenses personnelles",
      "Pourboires"
    ]
  },
  {
    id: "4",
    slug: "grand-popo-nature",
    title: "Grand-Popo et la nature",
    destination: "Grand-Popo",
    category: "Nature",
    duration: "2 jours",
    price: 75000,
    image: "[PHOTO CIRCUIT GRAND-POPO À REMPLACER]",
    description: "Détente et découverte à Grand-Popo, entre mer, fleuve et forêt. Profitez des plages, de la réserve de mono et de la culture locale.",
    highlights: [
      "Plages de Grand-Popo",
      "Réserve de mono",
      "Embouchure du fleuve",
      "Culture locale"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Grand-Popo",
        description: "Transfert, installation et exploration des plages."
      },
      {
        day: 2,
        title: "Réserve et retour",
        description: "Visite de la réserve de mono, temps libre et retour."
      }
    ],
    included: [
      "Transport",
      "Hébergement 1 nuit",
      "Guide francophone",
      "Petit-déjeuner",
      "Entrées aux sites"
    ],
    excluded: [
      "Déjeuners et dîners",
      "Dépenses personnelles"
    ]
  },
  {
    id: "5",
    slug: "vodoun-culture",
    title: "Initiation au Vodoun",
    destination: "Ouidah",
    category: "Vodoun",
    duration: "3 jours",
    price: 120000,
    image: "[PHOTO CIRCUIT VODOUN À REMPLACER]",
    description: "Une immersion respectueuse dans la culture Vodoun à Ouidah. Découvrez les temples, les cérémonies et la spiritualité béninoise.",
    highlights: [
      "Temples Vodoun",
      "Cérémonies traditionnelles",
      "Rencontre avec prêtres Vodoun",
      "Route des Esclaves"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée et introduction",
        description: "Accueil à Ouidah, introduction à la culture Vodoun et visite de la Route des Esclaves."
      },
      {
        day: 2,
        title: "Temples et cérémonies",
        description: "Visite de temples Vodoun, participation à une cérémonie (si disponible)."
      },
      {
        day: 3,
        title: "Approfondissement et retour",
        description: "Rencontre avec des prêtres Vodoun, temps d'échange et retour."
      }
    ],
    included: [
      "Transport",
      "Hébergement 2 nuits",
      "Guide spécialisé",
      "Petits-déjeuners",
      "Activités culturelles"
    ],
    excluded: [
      "Déjeuners et dîners",
      "Dépenses personnelles",
      "Offrandes (optionnelles)"
    ]
  },
  {
    id: "6",
    slug: "porto-novo-architecture",
    title: "Porto-Novo et son architecture",
    destination: "Porto-Novo",
    category: "Culture",
    duration: "1 jour",
    price: 50000,
    image: "[PHOTO CIRCUIT PORTO-NOVO À REMPLACER]",
    description: "Découvrez la capitale politique du Bénin et son architecture coloniale afro-brésilienne unique. Visitez le musée ethnographique et le marché Adjido.",
    highlights: [
      "Architecture afro-brésilienne",
      "Musée ethnographique",
      "Marché Adjido",
      "Palais du Gouverneur"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journée à Porto-Novo",
        description: "Transfert, visite de la ville, du musée et du marché. Déjeuner local et retour."
      }
    ],
    included: [
      "Transport",
      "Guide francophone",
      "Entrées aux sites",
      "Déjeuner"
    ],
    excluded: [
      "Dépenses personnelles",
      "Pourboires"
    ]
  }
];
