'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, Category } from '@/types';
import {
  filterProducts,
  sortProducts,
  getAvailableSpecFacets,
  FilterOptions,
  SortOption,
} from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SlidersHorizontal, X } from 'lucide-react';

export interface CategoryShopViewProps {
  category: Category;
  initialProducts: Product[];
}

export function CategoryShopView({
  category,
  initialProducts,
}: CategoryShopViewProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    categorySlug: category.slug,
    brandSlug: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    inStockOnly: false,
    selectedSpecs: {},
  });

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Dynamically derive specification facets from products in this category
  const specFacets = useMemo(() => {
    return getAvailableSpecFacets(category.slug, initialProducts);
  }, [category.slug, initialProducts]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(initialProducts, filters);
    return sortProducts(filtered, sortBy);
  }, [initialProducts, filters, sortBy]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      categorySlug: category.slug,
      brandSlug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      inStockOnly: false,
      selectedSpecs: {},
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: category.name },
        ]}
        className="mb-4"
      />

      {/* Category Header Banner */}
      <div className="p-6 sm:p-7 rounded-md bg-slate-50 border border-slate-200 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Department
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5 mb-1.5">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-semibold shrink-0"
          >
            &larr; All Products
          </Link>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200 gap-3 text-xs">
        <div className="text-slate-500">
          Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
          <strong className="text-slate-900">{initialProducts.length}</strong> products
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

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="p-4 rounded-md bg-white border border-slate-200">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalProductsCount={filteredProducts.length}
              hideCategoryFilter={true}
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
                  <span className="font-bold text-sm text-slate-900">
                    Filter {category.name}
                  </span>
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
                  hideCategoryFilter={true}
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
            emptyTitle={`No ${category.name.toLowerCase()} match your filters`}
            emptyMessage="Try resetting your specifications, price range, or brand filters to see more available products."
          />
        </div>
      </div>
    </div>
  );
}
