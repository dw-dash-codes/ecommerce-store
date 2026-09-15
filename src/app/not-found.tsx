import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/shop/SearchBar';
import { categories } from '@/data/categories';
import { Home, ShoppingCart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center">
        <span className="text-4xl sm:text-6xl font-black text-slate-300 font-mono block mb-2">
          404
        </span>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Page or Product Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-6">
          The page you are looking for might have been moved or is currently unavailable. Try searching our store below:
        </p>

        <div className="max-w-sm mx-auto mb-6">
          <SearchBar placeholder="Search keyboards, mice, monitors..." />
        </div>

        <div className="pt-4 border-t border-slate-200 mb-6">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Browse Categories
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/shop/${c.slug}`}
                className="text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Browse All Store</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
