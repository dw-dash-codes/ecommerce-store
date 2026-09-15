export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  featured?: boolean;
  itemCount?: number;
}
