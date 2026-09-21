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

export const CIRCUITS: Circuit[] = [];
