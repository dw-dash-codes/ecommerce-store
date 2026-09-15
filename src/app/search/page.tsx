'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, filterProducts } from '@/lib/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SearchBar } from '@/components/shop/SearchBar';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Loader2, ArrowRight, SearchX } from 'lucide-react';

function SearchInner() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);

  const allProducts = useMemo(() => getAllProducts(), []);

  const searchResults = useMemo(() => {
    if (!query.trim()) return allProducts;
    return filterProducts(allProducts, { searchQuery: query });
  }, [allProducts, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <Breadcrumbs items={[{ label: 'Shop', href: '/shop' }, { label: 'Search' }]} className="mb-4" />

      {/* Search Header Area */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {query.trim() ? (
            <span>Search results for &ldquo;{query}&rdquo;</span>
          ) : (
            <span>Search Products</span>
          )}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-5">
          Find monitors, gaming mice, mechanical keyboards, headsets, and computer accessories.
        </p>

        <SearchBar
          initialQuery={query}
          onSearch={(q) => setQuery(q)}
          placeholder="Search by brand (Logitech, ATK, AOC), model, or SKU..."
        />

        {/* Quick Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 text-xs text-slate-500">
          <span className="text-[11px] text-slate-400 font-medium">Popular:</span>
          {['Superlight', 'Rapid Trigger', 'PAW3395', '165Hz', 'Gasket', 'HyperX', 'Logitech'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer text-xs"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Subheader */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200 text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900">{searchResults.length}</strong> items
          {query.trim() && (
            <span>
              {' '}for &ldquo;<strong className="text-slate-900">{query}</strong>&rdquo;
            </span>
          )}
        </span>
        {query.trim() && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Results Content */}
      {searchResults.length > 0 ? (
        <ProductGrid products={searchResults} columns={4} />
      ) : (
        <div className="py-16 text-center max-w-md mx-auto bg-slate-50 rounded-md border border-slate-200 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <SearchX className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            No products found
          </h2>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            We could not find any products matching &ldquo;{query}&rdquo;. Check for spelling errors or try broader keywords.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Browse All Products</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

function SearchContainer() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  return <SearchInner key={urlQuery} />;
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <p className="text-xs text-slate-400">Loading search results...</p>
        </div>
      }
    >
      <SearchContainer />
    </Suspense>
  );
}
