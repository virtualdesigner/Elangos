import type { Product } from './types';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/api/products`, { signal });
  if (!res.ok) {
    throw new Error(`Could not load products (HTTP ${res.status})`);
  }
  return (await res.json()) as Product[];
}
