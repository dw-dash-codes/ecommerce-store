'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { PriceTag } from '@/components/common/PriceTag';
import { StarRating } from '@/components/common/StarRating';
import { StockBadge } from './StockBadge';
import { Button } from '@/components/common/Button';
import { ProductGrid } from './ProductGrid';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Share2,
  Heart,
} from 'lucide-react';

export interface ProductViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductView({ product, relatedProducts }: ProductViewProps) {
  const { addItem, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const qtyInCart = getItemQuantity(product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail || DEFAULT_PRODUCT_IMAGE];

  const currentImageSrc = getProductImageUrl(galleryImages[selectedImage] || galleryImages[0]);

  const isAvailable =
    product.stockStatus === 'in_stock' || product.stockStatus === 'low_stock';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCart = () => {
    if (isAvailable) {
      addItem(product.id, quantity);
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Gallery Column (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            className="aspect-[4/3] rounded-md bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-6 relative cursor-crosshair"
          >
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-150 ease-out"
              style={{
                transform: isZooming ? 'scale(1.45)' : 'scale(1)',
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              }}
            >
              <Image
                src={currentImageSrc}
                alt={product.name}
                width={600}
                height={450}
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                }}
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {siteConfig.features.showProductCardBadges && (
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                <StockBadge status={product.stockStatus} quantity={product.stockQuantity} size="md" />
                {product.bestSeller && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white uppercase tracking-wider">
                    Best Seller
                  </span>
                )}
                {siteConfig.features.showDiscounts && product.salePrice && product.salePrice < product.price && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white uppercase tracking-wider">
                    Sale
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-14 rounded border p-1 bg-white flex items-center justify-center transition-all cursor-pointer ${
                    selectedImage === idx
                      ? 'border-blue-600 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Image
                    src={getProductImageUrl(img)}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    width={64}
                    height={56}
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                    }}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy Box & Details Column (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-blue-700 font-bold uppercase tracking-wider text-xs">
                {product.brand}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-2">
              {product.name}
            </h1>

            <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-4">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded border transition-colors cursor-pointer',
                    isSaved
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:text-red-500'
                  )}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={cn('w-3.5 h-3.5', isSaved && 'fill-current text-red-600')} />
                  <span>{isSaved ? 'Saved' : 'Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="py-3">
              <PriceTag price={product.price} salePrice={product.salePrice} size="xl" />
              <span className="text-[11px] text-slate-500 block mt-1">
                Prices in PKR. Nationwide delivery across Pakistan.
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {product.shortDescription}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="flex items-center justify-between border border-slate-300 bg-white rounded-md p-1 w-full sm:w-32">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <Button
                variant="primary"
                size="md"
                disabled={!isAvailable}
                onClick={handleAddToCart}
                leftIcon={<ShoppingCart className="w-4 h-4" />}
                className="flex-1 py-3 cursor-pointer shadow-xs"
              >
                {!isAvailable
                  ? 'Out of Stock'
                  : qtyInCart > 0
                  ? `Add More (${qtyInCart} in cart)`
                  : 'Add to Cart'}
              </Button>
            </div>
          </div>

          {/* Service Highlights Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Nationwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{product.warranty}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-slate-600 shrink-0" />
              <span>7-Day Return Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-slate-200 pt-6">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('desc')}
            className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'desc'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`text-xs sm:text-sm font-bold pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Reviews ({product.reviews.length})
          </button>
        </div>

        <div className="py-4">
          {activeTab === 'specs' && (
            <div className="rounded-md border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                    >
                      <th className="py-2.5 px-4 font-medium text-slate-500 w-1/3 border-b border-slate-200">
                        {spec.name}
                      </th>
                      <td className="py-2.5 px-4 text-slate-900 font-semibold border-b border-slate-200 font-mono text-xs">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50">
                    <th className="py-2.5 px-4 font-medium text-slate-500">
                      Warranty
                    </th>
                    <td className="py-2.5 px-4 text-emerald-700 font-semibold text-xs">
                      {product.warranty}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-md bg-white border border-slate-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      {rev.author} {rev.location && `(${rev.location})`}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {rev.date}
                    </span>
                  </div>
                  <StarRating rating={rev.rating} size="sm" showNumber={false} />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Related Products
          </h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      )}
    </div>
  );
}
