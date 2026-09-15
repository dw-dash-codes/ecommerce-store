'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { PriceTag } from '@/components/common/PriceTag';
import { StarRating } from '@/components/common/StarRating';
import { StockBadge } from './StockBadge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import { siteConfig } from '@/config/site';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const qtyInCart = getItemQuantity(product.id);

  const [imgSrc, setImgSrc] = useState(
    getProductImageUrl(product.thumbnail || product.images?.[0])
  );

  const isAvailable =
    product.stockStatus === 'in_stock' || product.stockStatus === 'low_stock';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable) {
      addItem(product.id, 1);
    }
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col bg-white border border-slate-200 rounded-md overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-150',
        className
      )}
    >
      {/* Optional Top Left Promotional/Status Badges (Feature-flagged) */}
      {siteConfig.features.showProductCardBadges && (
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
          {siteConfig.features.showDiscounts && product.salePrice && product.salePrice < product.price && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white leading-none uppercase tracking-wide shadow-xs">
              Sale
            </span>
          )}
          {product.bestSeller && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white leading-none uppercase tracking-wide">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white leading-none uppercase tracking-wide">
              New
            </span>
          )}
        </div>
      )}

      {/* Top Right Controls: Wishlist Button (& optional stock badge) */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
        {siteConfig.features.showProductCardBadges && (
          <StockBadge status={product.stockStatus} size="sm" />
        )}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={cn(
            'p-1.5 rounded-full border transition-colors cursor-pointer',
            isSaved
              ? 'bg-red-50 border-red-200 text-red-600'
              : 'bg-white/90 border-slate-200 text-slate-400 hover:text-red-500 hover:border-slate-300'
          )}
        >
          <Heart className={cn('w-3.5 h-3.5', isSaved && 'fill-current text-red-600')} />
        </button>
      </div>

      {/* Product Image Stage */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 flex items-center justify-center p-3"
      >
        <Image
          src={imgSrc}
          alt={product.name}
          width={280}
          height={210}
          onError={() => setImgSrc(DEFAULT_PRODUCT_IMAGE)}
          className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
          unoptimized
        />
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-semibold text-blue-700 uppercase tracking-wide text-[11px]">
            {product.brand}
          </span>
          <span className="text-[10px] text-slate-400">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-slate-900 font-semibold text-xs sm:text-sm leading-snug line-clamp-2 hover:text-blue-600 transition-colors mb-2 min-h-[2.5rem]"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mb-2.5">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* Pricing & Add to Cart Bottom */}
        <div className="mt-auto pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <PriceTag
            price={product.price}
            salePrice={product.salePrice}
            size="md"
          />

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isAvailable}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              'inline-flex items-center justify-center px-2.5 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer',
              isAvailable
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:bg-blue-800'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            )}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:mr-1" />
            <span className="hidden sm:inline">
              {qtyInCart > 0 ? `Add (${qtyInCart})` : 'Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
