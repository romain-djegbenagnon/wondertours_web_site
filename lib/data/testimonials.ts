export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  avatar?: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "[NOM CLIENT À INTÉGRER]",
    country: "France",
    rating: 5,
    text: "[TÉMOIGNAGE CLIENT À INTÉGRER]",
    date: "2024-01-15"
  },
  {
    id: "2",
    name: "[NOM CLIENT À INTÉGRER]",
    country: "Belgique",
    rating: 5,
    text: "[TÉMOIGNAGE CLIENT À INTÉGRER]",
    date: "2024-02-20"
  },
  {
    id: "3",
    name: "[NOM CLIENT À INTÉGRER]",
    country: "Canada",
    rating: 5,
    text: "[TÉMOIGNAGE CLIENT À INTÉGRER]",
    date: "2024-03-10"
  },
  {
    id: "4",
    name: "[NOM CLIENT À INTÉGRER]",
    country: "Suisse",
    rating: 5,
    text: "[TÉMOIGNAGE CLIENT À INTÉGRER]",
    date: "2024-04-05"
  }
];
