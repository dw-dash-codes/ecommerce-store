'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { formatPKR } from '@/lib/formatters';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import { siteConfig } from '@/config/site';

export interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  initialQuery = '',
  onSearch,
  placeholder = 'Search by model, brand, category, or SKU...',
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive matching suggestions (up to 5)
  const trimmed = query.trim().toLowerCase();
  const suggestions: Product[] =
    trimmed.length >= 2
      ? products
          .filter((p) => {
            const nameMatch = p.name.toLowerCase().includes(trimmed);
            const brandMatch = p.brand.toLowerCase().includes(trimmed);
            const catMatch = p.category.toLowerCase().includes(trimmed);
            const skuMatch = p.sku.toLowerCase().includes(trimmed);
            const tagMatch = p.tags.some((t) => t.toLowerCase().includes(trimmed));
            return nameMatch || brandMatch || catMatch || skuMatch || tagMatch;
          })
          .slice(0, 5)
      : [];

  const totalMatchesCount =
    trimmed.length >= 2
      ? products.filter((p) => {
          const nameMatch = p.name.toLowerCase().includes(trimmed);
          const brandMatch = p.brand.toLowerCase().includes(trimmed);
          const catMatch = p.category.toLowerCase().includes(trimmed);
          const skuMatch = p.sku.toLowerCase().includes(trimmed);
          const tagMatch = p.tags.some((t) => t.toLowerCase().includes(trimmed));
          return nameMatch || brandMatch || catMatch || skuMatch || tagMatch;
        }).length
      : 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    if (onSearch) {
      onSearch(query.trim());
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className || ''}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-white text-slate-900 text-xs sm:text-sm rounded-md pl-9 pr-9 py-2 border border-slate-300 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden">
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Product Suggestions</span>
            <span className="font-mono">{totalMatchesCount} matches</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
            {suggestions.map((p) => {
              const showDiscounts = siteConfig.features.showDiscounts;
              const effectivePrice = p.salePrice ?? p.price;
              const hasDiscount = showDiscounts && !!p.salePrice && p.salePrice < p.price;

              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center p-1">
                    <Image
                      src={getProductImageUrl(p.thumbnail || p.images?.[0])}
                      alt={p.name}
                      width={40}
                      height={40}
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span className="font-bold text-blue-700 uppercase">{p.brand}</span>
                      <span>&bull;</span>
                      <span>{p.category}</span>
                      <span>&bull;</span>
                      <span className="font-mono text-slate-400">{p.sku}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {p.name}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-slate-900 font-mono">
                      {formatPKR(effectivePrice)}
                    </div>
                    {hasDiscount && (
                      <div className="text-[10px] text-slate-400 line-through font-mono">
                        {formatPKR(p.price)}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border-t border-slate-200 text-xs font-semibold text-blue-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View all {totalMatchesCount} search results for &ldquo;{query}&rdquo;</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
