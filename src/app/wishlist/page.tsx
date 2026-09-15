'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { products, wishlistCount, clearWishlist } = useWishlist();

  if (wishlistCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-md bg-white border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 mb-1">
            Your wishlist is empty.
          </h1>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Save computer accessories, gaming mice, monitors, and keyboards you want to purchase later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={[{ label: 'Shop', href: '/shop' }, { label: 'Wishlist' }]} className="mb-3" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            My Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Products you saved for later. Easily add them to your cart when ready.
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Wishlist</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
