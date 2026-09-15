'use client';

import React from 'react';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { FilterOptions, SpecFacet } from '@/lib/products';
import { RotateCcw } from 'lucide-react';

export interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
  hideCategoryFilter?: boolean;
  specFacets?: SpecFacet[];
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalProductsCount,
  hideCategoryFilter = false,
  specFacets = [],
}: FilterSidebarProps) {
  const priceBrackets = [
    { label: 'All Prices', min: undefined, max: undefined },
    { label: 'Under PKR 10,000', min: 0, max: 10000 },
    { label: 'PKR 10,000 – PKR 25,000', min: 10000, max: 25000 },
    { label: 'PKR 25,000 – PKR 50,000', min: 25000, max: 50000 },
    { label: 'Above PKR 50,000', min: 50000, max: undefined },
  ];

  const handleSpecToggle = (specName: string, value: string) => {
    const current = filters.selectedSpecs?.[specName] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const updated = { ...(filters.selectedSpecs || {}) };
    if (next.length > 0) {
      updated[specName] = next;
    } else {
      delete updated[specName];
    }
    onFilterChange({ selectedSpecs: updated });
  };

  return (
    <aside className="w-full space-y-5">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Filters
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            ({totalProductsCount})
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* In-Stock Toggle */}
      <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-800">
          In-Stock Only
        </span>
        <input
          type="checkbox"
          checked={!!filters.inStockOnly}
          onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
        />
      </div>

      {/* Categories (hidden when on dedicated category landing) */}
      {!hideCategoryFilter && (
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Categories
          </h4>
          <div className="space-y-0.5">
            <button
              onClick={() => onFilterChange({ categorySlug: undefined, selectedSpecs: undefined })}
              className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                !filters.categorySlug || filters.categorySlug === 'all'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => {
              const isSelected =
                filters.categorySlug === c.slug ||
                (filters.categorySlug === 'gaming-mice' && c.slug === 'mice');
              return (
                <button
                  key={c.id}
                  onClick={() => onFilterChange({ categorySlug: c.slug, selectedSpecs: undefined })}
                  className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {c.itemCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Brands */}
      <div className="space-y-1.5 pt-3 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Brands
        </h4>
        <div className="space-y-0.5">
          <button
            onClick={() => onFilterChange({ brandSlug: undefined })}
            className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
              !filters.brandSlug || filters.brandSlug === 'all'
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => {
            const isSelected = filters.brandSlug === b.slug;
            return (
              <button
                key={b.id}
                onClick={() => onFilterChange({ brandSlug: b.slug })}
                className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{b.name}</span>
                <span className="text-[10px] text-slate-400 uppercase">
                  {b.origin}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-1.5 pt-3 border-t border-slate-200">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Price Range (PKR)
        </h4>
        <div className="space-y-0.5">
          {priceBrackets.map((bracket, i) => {
            const isSelected =
              filters.minPrice === bracket.min &&
              filters.maxPrice === bracket.max;

            return (
              <button
                key={i}
                onClick={() =>
                  onFilterChange({
                    minPrice: bracket.min,
                    maxPrice: bracket.max,
                  })
                }
                className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {bracket.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category-Specific Dynamic Specification Filters */}
      {specFacets.length > 0 && (
        <div className="space-y-4 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Specifications
            </h4>
            <span className="text-[10px] text-blue-600 font-semibold uppercase">
              Technical
            </span>
          </div>

          {specFacets.map((facet) => (
            <div key={facet.name} className="space-y-1.5">
              <h5 className="text-[11px] font-semibold text-slate-700">
                {facet.name}
              </h5>
              <div className="space-y-1 pl-0.5 max-h-40 overflow-y-auto">
                {facet.options.map((opt) => {
                  const isChecked = !!filters.selectedSpecs?.[facet.name]?.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSpecToggle(facet.name, opt.value)}
                          className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        />
                        <span className="text-xs">{opt.value}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({opt.count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
