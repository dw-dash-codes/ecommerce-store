'use client';

import React, { useState, useMemo, Suspense, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/types/order';
import { formatPKR } from '@/lib/formatters';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import {
  CheckCircle2,
  Phone,
  ArrowRight,
  Copy,
  Check,
  Home,
  ShoppingBag,
  Loader2,
  Clock,
} from 'lucide-react';

const ORDER_SESSION_KEY = 'nexbyte_last_order';

function subscribeOrder() {
  return () => {};
}

function getOrderSnapshot(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.sessionStorage.getItem(ORDER_SESSION_KEY) || '';
  } catch {
    return '';
  }
}

function getServerOrderSnapshot(): string {
  return '';
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get('orderId') || 'NXB-20260915-1001';

  const orderJson = useSyncExternalStore(subscribeOrder, getOrderSnapshot, getServerOrderSnapshot);

  const order = useMemo<Order | null>(() => {
    if (!orderJson) return null;
    try {
      return JSON.parse(orderJson) as Order;
    } catch {
      return null;
    }
  }, [orderJson]);

  const [copied, setCopied] = useState(false);
  const activeOrderId = order?.id || urlOrderId;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(activeOrderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Success Header Card */}
      <div className="p-6 sm:p-8 rounded-md bg-white border border-slate-200 shadow-xs text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
            Order Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank you for shopping with NexByte.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
            Your order has been received. Our team will contact you personally to confirm delivery and payment details.
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Order Number:</span>
          <span className="text-sm sm:text-base font-bold font-mono text-slate-900">
            {activeOrderId}
          </span>
          <button
            type="button"
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            aria-label="Copy Order Number"
            title="Copy Order Number"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Next Steps Box */}
      <div className="p-4 sm:p-5 rounded-md bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-blue-900">
          <Clock className="w-4 h-4 text-blue-700" />
          <span>What Happens Next?</span>
        </div>
        <p className="text-slate-700 leading-relaxed text-xs">
          1. A NexByte representative will review your order items and verify available courier shipping to your specific location.
        </p>
        <p className="text-slate-700 leading-relaxed text-xs">
          2. You will receive a WhatsApp message or phone call to confirm total shipping charges and agree on your preferred payment method (Cash on Delivery, Raast, or Direct Bank Transfer).
        </p>
        <p className="text-slate-700 leading-relaxed text-xs">
          3. Once confirmed with you, your parcel is carefully packaged and dispatched with an official courier tracking number.
        </p>
      </div>

      {/* Order Summary & Customer Details */}
      {order && (
        <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs font-mono font-normal text-slate-500">
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
            </span>
          </h2>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-md border border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Recipient
              </span>
              <span className="text-slate-900 font-semibold">{order.customer.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Phone Number
              </span>
              <span className="text-slate-900 font-semibold font-mono">{order.customer.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Email Address
              </span>
              <span className="text-slate-900 font-medium">{order.customer.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Destination City
              </span>
              <span className="text-slate-900 font-semibold">{order.customer.city}</span>
            </div>
            <div className="sm:col-span-2 pt-1 border-t border-slate-200/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Complete Delivery Address
              </span>
              <span className="text-slate-900">{order.customer.address}</span>
            </div>
            {order.notes && (
              <div className="sm:col-span-2 pt-1 border-t border-slate-200/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Order Notes
                </span>
                <span className="text-slate-700 italic">&ldquo;{order.notes}&rdquo;</span>
              </div>
            )}
          </div>

          {/* Items Breakdown */}
          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.productId} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                  <Image
                    src={getProductImageUrl(item.thumbnail)}
                    alt={item.productName}
                    width={48}
                    height={48}
                    unoptimized
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PRODUCT_IMAGE;
                    }}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-blue-700 font-bold uppercase block">
                    {item.brand}
                  </span>
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {item.productName}
                  </p>
                  <span className="text-[11px] text-slate-500">
                    Qty: <strong>{item.quantity}</strong> &bull; {formatPKR(item.unitPrice)} each
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {formatPKR(item.lineTotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="text-slate-900 font-bold font-mono text-sm">
                {formatPKR(order.subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Shipping Charges</span>
              <span className="text-slate-500 italic text-[11px]">
                {order.shipping}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Payment Details</span>
              <span className="text-slate-500 italic text-[11px]">
                {order.paymentMethod}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
              <span>Total Amount</span>
              <span className="text-slate-500 font-normal text-xs italic">
                {order.total}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href={`https://wa.me/923006392983?text=Hi%20NexByte,%20I%20have%20submitted%20order%20${encodeURIComponent(activeOrderId)}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Contact on WhatsApp</span>
        </a>

        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500">Loading order receipt...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
