export type ProductKind = 'dal' | 'moong' | 'rice' | 'rajma' | 'peanut';

/** Product as returned by GET /api/products. Keep in sync with backend/src/types/product.ts */
export interface Product {
  id: number;
  name: string;
  short: string;
  desc: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  category: string;
  weights: string[];
  color: string;
  kind: ProductKind;
  badge: string | null;
  soldOut: boolean;
}

export interface CartItem {
  key: string;
  product: Product;
  weight: string;
  qty: number;
}

export type Availability = 'all' | 'stock' | 'out';

export const SORT_OPTIONS = [
  'Featured',
  'Best selling',
  'Alphabetically, A-Z',
  'Price, low to high',
  'Price, high to low',
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
