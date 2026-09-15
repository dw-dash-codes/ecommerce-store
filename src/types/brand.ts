export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo?: string;
  origin?: string;
  website?: string;
  featured?: boolean;
}
