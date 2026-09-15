'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/formatters';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    shippingNote,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-slate-900/40 transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Shopping Cart ({itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  Browse our latest gaming and computer gear.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Link href="/shop">Start Shopping</Link>
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 p-3 rounded-md bg-white border border-slate-200"
                >
                  {/* Thumbnail */}
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

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] text-blue-700 uppercase font-semibold block">
                          {item.product.brand}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-900 truncate">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h4>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {formatPKR(item.unitPrice)} each
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity & Line Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1 border border-slate-300 rounded bg-slate-50 p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono px-2 text-slate-800 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded hover:bg-slate-200 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {formatPKR(item.lineSubtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold font-mono text-sm">
                    {formatPKR(subtotal)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-0.5">
                  Shipping: <span className="font-medium text-slate-700">{shippingNote}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full text-center py-2.5 px-3 rounded-md text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors shadow-xs"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                Payment on Delivery (COD), Raast & Bank Transfer supported
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
