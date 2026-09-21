export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  avatar?: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [];
