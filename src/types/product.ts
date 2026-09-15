export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';

export interface ProductSpecification {
  name: string;
  value: string;
  group?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedPurchase?: boolean;
  location?: string; // e.g. "Islamabad, PK", "Lahore, PK"
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandId: string;
  category: string;
  categoryId: string;
  sku: string;
  price: number; // in PKR
  salePrice?: number; // in PKR, if on discount
  images: string[];
  thumbnail: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpecification[];
  warranty: string; // e.g. "1 Year Official Brand Warranty", "10 Months NexByte Warranty"
  stockStatus: StockStatus;
  stockQuantity?: number;
  featured: boolean;
  bestSeller: boolean;
  isNew?: boolean;
  rating: number; // e.g. 4.8
  reviewCount: number;
  reviews: Review[];
  tags: string[];
  relatedProducts: string[]; // array of product slugs or IDs
}
