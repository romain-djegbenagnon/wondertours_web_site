export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "que-decouvrir-a-ouidah",
    title: "Que découvrir à Ouidah ?",
    category: "Destinations",
    excerpt: "Ouidah, ancien port de traite et berceau du Vodoun, est une ville riche en histoire et en culture. Découvrez ses trésors.",
    content: "[CONTENU ARTICLE À FOURNIR PAR LE CLIENT]",
    image: "[PHOTO ARTICLE OUIDAH À REMPLACER]",
    date: "2024-01-15",
    author: "Wonder Tours",
    readTime: "5 min"
  },
  {
    id: "2",
    slug: "10-lieux-incontournables-benin",
    title: "10 lieux incontournables au Bénin",
    category: "Conseils",
    excerpt: "Du village lacustre de Ganvié aux palais royaux d'Abomey, voici les 10 lieux à ne pas manquer lors de votre voyage au Bénin.",
    content: "[CONTENU ARTICLE À FOURNIR PAR LE CLIENT]",
    image: "[PHOTO ARTICLE BÉNIN À REMPLACER]",
    date: "2024-02-10",
    author: "Wonder Tours",
    readTime: "8 min"
  },
  {
    id: "3",
    slug: "patrimoine-beninois",
    title: "Découvrir le patrimoine du Bénin",
    category: "Culture",
    excerpt: "Le Bénin regorge d'un patrimoine culturel et historique exceptionnel. Plongez dans l'histoire des royaumes du Dahomey et la culture Vodoun.",
    content: "[CONTENU ARTICLE À FOURNIR PAR LE CLIENT]",
    image: "[PHOTO ARTICLE PATRIMOINE À REMPLACER]",
    date: "2024-03-05",
    author: "Wonder Tours",
    readTime: "6 min"
  },
  {
    id: "4",
    slug: "guide-voyage-benin",
    title: "Guide de voyage au Bénin",
    category: "Conseils",
    excerpt: "Tout ce que vous devez savoir pour préparer votre voyage au Bénin : visa, santé, transport, monnaie et conseils pratiques.",
    content: "[CONTENU ARTICLE À FOURNIR PAR LE CLIENT]",
    image: "[PHOTO ARTICLE GUIDE À REMPLACER]",
    date: "2024-04-01",
    author: "Wonder Tours",
    readTime: "10 min"
  },
  {
    id: "5",
    slug: "comprendre-vodoun-benin",
    title: "Comprendre le Vodoun au Bénin",
    category: "Culture",
    excerpt: "Le Vodoun est une religion ancestrale née au Bénin. Découvrez ses origines, ses pratiques et son importance culturelle.",
    content: "[CONTENU ARTICLE À FOURNIR PAR LE CLIENT]",
    image: "[PHOTO ARTICLE VODOUN À REMPLACER]",
    date: "2024-04-20",
    author: "Wonder Tours",
    readTime: "7 min"
  },
  {
    id: "6",
    slug: "meilleure-periode-visiter-benin",
    title: "Quelle est la meilleure période pour visiter le Bénin ?",
    category: "Conseils",
    excerpt: "Le climat du Bénin varie selon les régions. Découvrez la meilleure période pour planifier votre voyage selon vos préférences.",
    content: "[CONTENU ARTICLE À FOURNIR PAR LE CLIENT]",
    image: "[PHOTO ARTICLE CLIMAT À REMPLACER]",
    date: "2024-05-15",
    author: "Wonder Tours",
    readTime: "4 min"
  }
];
