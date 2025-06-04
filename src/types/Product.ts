export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  discount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}