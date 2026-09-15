'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/formatters';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    shippingNote,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Validate if any item in cart has become out of stock
  const hasOutOfStockItems = items.some(
    (item) => item.product.stockStatus === 'out_of_stock'
  );

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-md bg-white border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 mb-1">
            Your cart is empty
          </h1>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Browse our latest gaming and computer gear.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={[{ label: 'Shop', href: '/shop' }, { label: 'Shopping Cart' }]} className="mb-3" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Out of stock warning banner if applicable */}
      {hasOutOfStockItems && (
        <div className="mb-6 p-3.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>
            One or more items in your cart are currently out of stock. Please remove them before proceeding to checkout.
          </span>
        </div>
      )}

      {/* Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="hidden sm:grid grid-cols-12 text-xs font-semibold uppercase text-slate-400 pb-2 border-b border-slate-200">
            <span className="col-span-6">Product</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          {items.map((item) => {
            const isOutOfStock = item.product.stockStatus === 'out_of_stock';

            return (
              <div
                key={item.productId}
                className={`p-3.5 rounded-md bg-white border ${
                  isOutOfStock ? 'border-red-200 bg-red-50/30' : 'border-slate-200'
                } flex flex-col sm:grid sm:grid-cols-12 gap-3 items-center`}
              >
                {/* Product details (6 cols) */}
                <div className="col-span-6 flex items-center gap-3 w-full">
                  <div className="w-16 h-16 rounded bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                    <Image
                      src={getProductImageUrl(item.product.thumbnail || item.product.images?.[0])}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-blue-700 block">
                      {item.product.brand}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1 hover:text-blue-600">
                      <Link href={`/product/${item.product.slug}`}>
                        {item.product.name}
                      </Link>
                    </h3>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      SKU: {item.product.sku}
                    </span>
                    {isOutOfStock && (
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-red-600 uppercase">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Price (2 cols) */}
                <div className="col-span-2 text-center text-xs text-slate-700 font-mono hidden sm:block">
                  {formatPKR(item.unitPrice)}
                </div>

                {/* Quantity Controls (2 cols) */}
                <div className="col-span-2 flex items-center justify-center gap-1 border border-slate-300 bg-white rounded-md p-0.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold font-mono px-2 text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Line Total & Remove (2 cols) */}
                <div className="col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                    {formatPKR(item.lineSubtotal)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Box (4 cols) */}
        <div className="lg:col-span-4">
          <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
              Order Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="text-slate-900 font-mono font-bold text-sm">
                  {formatPKR(subtotal)}
                </span>
              </div>

              <div className="flex flex-col gap-0.5 pt-1 text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="text-slate-500 italic text-[11px]">To be confirmed</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {shippingNote}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Total</span>
                <span className="text-slate-500 font-normal text-xs italic">
                  To be confirmed
                </span>
              </div>
            </div>

            {hasOutOfStockItems ? (
              <button
                type="button"
                disabled
                className="w-full py-3 px-4 rounded-md bg-slate-200 text-slate-400 font-bold text-xs cursor-not-allowed text-center"
              >
                Remove Out of Stock Items to Checkout
              </button>
            ) : (
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <div className="text-center pt-1">
              <Link
                href="/shop"
                className="text-xs text-slate-500 hover:text-blue-600 hover:underline inline-block"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-[10px] text-center text-slate-400 pt-2 border-t border-slate-100">
              Nationwide courier delivery across Pakistan &bull; Cash on Delivery & Raast
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
