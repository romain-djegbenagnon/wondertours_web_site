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
  // Traductions anglaises optionnelles (repli FR si absentes).
  titleEn?: string;
  categoryEn?: string;
  excerptEn?: string;
  contentEn?: string;
  readTimeEn?: string;
}

export const BLOG_POSTS: BlogPost[] = [];
