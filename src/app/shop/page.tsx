'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getAllProducts,
  filterProducts,
  sortProducts,
  getAvailableSpecFacets,
  FilterOptions,
  SortOption,
} from '@/lib/products';
import { categories } from '@/data/categories';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SlidersHorizontal, X, Loader2 } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || undefined;
  const initialBrand = searchParams.get('brand') || undefined;

  const [filters, setFilters] = useState<FilterOptions>({
    categorySlug: initialCategory,
    brandSlug: initialBrand,
    minPrice: undefined,
    maxPrice: undefined,
    inStockOnly: false,
    selectedSpecs: {},
  });

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allProducts = useMemo(() => getAllProducts(), []);

  // Compute category-specific dynamic spec facets if a category is active
  const specFacets = useMemo(() => {
    if (!filters.categorySlug || filters.categorySlug === 'all') return [];
    const categoryProds = allProducts.filter(
      (p) =>
        p.category.toLowerCase() === filters.categorySlug?.toLowerCase() ||
        p.categoryId.replace('cat-', '') === filters.categorySlug ||
        (filters.categorySlug === 'mice' && p.categoryId === 'cat-mice')
    );
    return getAvailableSpecFacets(filters.categorySlug, categoryProds);
  }, [allProducts, filters.categorySlug]);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(allProducts, filters);
    return sortProducts(filtered, sortBy);
  }, [allProducts, filters, sortBy]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      categorySlug: undefined,
      brandSlug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: false,
      selectedSpecs: {},
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={[{ label: 'Shop All Products' }]} className="mb-3" />

      {/* Header */}
      <div className="pb-4 border-b border-slate-200 mb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Shop All Products
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Browse our full inventory of monitors, gaming mice, mechanical keyboards, headsets, and accessories with nationwide delivery across Pakistan.
        </p>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => handleFilterChange({ categorySlug: undefined, selectedSpecs: {} })}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
              !filters.categorySlug || filters.categorySlug === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Products ({allProducts.length})
          </button>
          {categories.map((cat) => {
            const isSelected =
              filters.categorySlug === cat.slug ||
              (filters.categorySlug === 'gaming-mice' && cat.slug === 'mice');
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterChange({ categorySlug: cat.slug, selectedSpecs: {} })}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.name} ({cat.itemCount})
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Count, Mobile Trigger, and Sorting */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 gap-3 text-xs">
        <div className="text-slate-500">
          Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
          <strong className="text-slate-900">{allProducts.length}</strong> products
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-800 cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>Filters</span>
          </button>

          <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="p-4 rounded-md bg-white border border-slate-200">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalProductsCount={filteredProducts.length}
              specFacets={specFacets}
            />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full p-5 overflow-y-auto border-l border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <span className="font-bold text-sm text-slate-900">Filters</span>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalProductsCount={filteredProducts.length}
                  specFacets={specFacets}
                />
              </div>

              <div className="pt-4 border-t border-slate-200 mt-4">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-2.5 rounded bg-blue-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            columns={3}
            emptyTitle="No products found"
            emptyMessage="No products match your selected filters. Try resetting your price range, specifications, or brand selection."
          />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading products...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
