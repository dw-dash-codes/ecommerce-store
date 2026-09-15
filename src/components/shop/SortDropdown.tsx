'use client';

import React from 'react';
import { SortOption } from '@/lib/products';
import { ArrowUpDown } from 'lucide-react';

export interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-600">
      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
      <span className="hidden sm:inline">Sort:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-white text-slate-900 border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:border-blue-600 cursor-pointer font-medium"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
}
