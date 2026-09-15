import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { Product, Category, Brand } from '@/types';

export interface FilterOptions {
  categorySlug?: string;
  brandSlug?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  searchQuery?: string;
  selectedSpecs?: Record<string, string[]>;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'newest';

export interface SpecFacetOption {
  value: string;
  count: number;
}

export interface SpecFacet {
  name: string;
  options: SpecFacetOption[];
}

/**
 * Relevant specification keys for each category.
 * Available values are dynamically derived from products at runtime.
 */
export const CATEGORY_SPEC_FIELDS: Record<string, string[]> = {
  monitors: ['Screen Size', 'Resolution', 'Refresh Rate', 'Panel Type'],
  mice: ['Connection', 'Sensor', 'Weight', 'DPI'],
  'gaming-mice': ['Connection', 'Sensor', 'Weight', 'DPI'],
  keyboards: ['Switch Type', 'Connection', 'Layout'],
  headsets: ['Connection', 'Microphone', 'Audio Type'],
  accessories: ['Type', 'Material'],
};

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  if (slug === 'gaming-mice') {
    return categories.find((c) => c.slug === 'mice');
  }
  return categories.find((c) => c.slug === slug);
}

export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getBestSellerProducts(limit = 8): Product[] {
  return products.filter((p) => p.bestSeller).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  // First match explicit related product IDs/slugs
  const explicit = products.filter(
    (p) =>
      product.relatedProducts.includes(p.id) ||
      product.relatedProducts.includes(p.slug)
  );

  if (explicit.length >= limit) {
    return explicit.slice(0, limit);
  }

  // Backfill with products from the same category or brand
  const backfill = products.filter(
    (p) =>
      p.id !== product.id &&
      !explicit.some((ep) => ep.id === p.id) &&
      (p.categoryId === product.categoryId || p.brandId === product.brandId)
  );

  return [...explicit, ...backfill].slice(0, limit);
}

/**
 * Dynamically extract available specification values and counts from a given product list.
 * This guarantees any newly added product specs (e.g. 240Hz, 360Hz) appear automatically.
 */
export function getAvailableSpecFacets(
  categorySlug: string,
  categoryProducts: Product[]
): SpecFacet[] {
  const normalizedSlug = categorySlug === 'gaming-mice' ? 'mice' : categorySlug;
  const specFields = CATEGORY_SPEC_FIELDS[normalizedSlug] || [];
  if (specFields.length === 0) return [];

  const facets: SpecFacet[] = [];

  for (const field of specFields) {
    const valueCounts = new Map<string, number>();

    for (const product of categoryProducts) {
      const spec = product.specifications?.find(
        (s) => s.name.toLowerCase() === field.toLowerCase()
      );
      if (spec && spec.value) {
        const cleanVal = spec.value.trim();
        valueCounts.set(cleanVal, (valueCounts.get(cleanVal) || 0) + 1);
      }
    }

    if (valueCounts.size > 0) {
      facets.push({
        name: field,
        options: Array.from(valueCounts.entries())
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value)),
      });
    }
  }

  return facets;
}

export function filterProducts(items: Product[], filters: FilterOptions): Product[] {
  return items.filter((product) => {
    // Category filter (supports both 'mice' and 'gaming-mice')
    if (filters.categorySlug && filters.categorySlug !== 'all') {
      const targetSlug =
        filters.categorySlug === 'gaming-mice' ? 'mice' : filters.categorySlug;
      const category = getCategoryBySlug(targetSlug);
      if (
        category &&
        product.categoryId !== category.id &&
        product.category.toLowerCase() !== category.name.toLowerCase() &&
        product.category.toLowerCase() !== targetSlug.toLowerCase()
      ) {
        return false;
      }
    }

    // Brand filter
    if (filters.brandSlug && filters.brandSlug !== 'all') {
      const brand = getBrandBySlug(filters.brandSlug);
      if (
        brand &&
        product.brandId !== brand.id &&
        product.brand.toLowerCase() !== filters.brandSlug.toLowerCase()
      ) {
        return false;
      }
    }

    // Price range
    const effectivePrice = product.salePrice ?? product.price;
    if (filters.minPrice !== undefined && effectivePrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && effectivePrice > filters.maxPrice) {
      return false;
    }

    // In-Stock filter
    if (filters.inStockOnly && product.stockStatus !== 'in_stock') {
      return false;
    }

    // Specification filters (dynamically checked)
    if (filters.selectedSpecs) {
      for (const [specName, selectedValues] of Object.entries(filters.selectedSpecs)) {
        if (!selectedValues || selectedValues.length === 0) continue;

        const productSpec = product.specifications?.find(
          (s) => s.name.toLowerCase() === specName.toLowerCase()
        );
        if (!productSpec) return false;

        const matches = selectedValues.some((val) =>
          productSpec.value.toLowerCase().includes(val.toLowerCase()) ||
          val.toLowerCase().includes(productSpec.value.toLowerCase())
        );

        if (!matches) return false;
      }
    }

    // Search query: matching Name, Brand, Category, SKU, Tags, Description
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const brandMatch = product.brand.toLowerCase().includes(q);
      const categoryMatch = product.category.toLowerCase().includes(q);
      const skuMatch = product.sku.toLowerCase().includes(q);
      const descMatch = product.shortDescription.toLowerCase().includes(q);
      const tagMatch = product.tags.some((t) => t.toLowerCase().includes(q));

      if (!nameMatch && !brandMatch && !categoryMatch && !skuMatch && !descMatch && !tagMatch) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(items: Product[], sortBy: SortOption = 'featured'): Product[] {
  const cloned = [...items];
  switch (sortBy) {
    case 'price-asc':
      return cloned.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    case 'price-desc':
      return cloned.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    case 'rating-desc':
      return cloned.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'newest':
      return cloned.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case 'featured':
    default:
      return cloned.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}
