'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/formatters';
import { getProductImageUrl, DEFAULT_PRODUCT_IMAGE } from '@/lib/images';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import {
  validateEmail,
  validatePakistaniPhone,
  PAKISTAN_MAJOR_CITIES,
  verifyAndCreateOrder,
} from '@/lib/order';
import { sendOrderEmails } from '@/lib/emailjs';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  AlertCircle,
  Loader2,
  CheckCircle2,
  RefreshCw,
  Phone,
} from 'lucide-react';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  customCity: string;
  notes: string;
  // Honeypot field for spam prevention (must remain empty)
  faxNumber: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingNote, clearCart } = useCart();

  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    customCity: '',
    notes: '',
    faxNumber: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedAt, setLastSubmittedAt] = useState<number>(0);

  const isSubmittingRef = useRef<boolean>(false);

  // If cart is empty, show clean message
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-md bg-white border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 mb-1">
            Your cart is empty.
          </h1>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            You must have at least one product in your cart before checking out.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!validatePakistaniPhone(form.phone)) {
      newErrors.phone = 'Please enter a valid Pakistani phone number (e.g., 0300 1234567).';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., you@example.com).';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Complete delivery address is required.';
    }

    const effectiveCity = form.city === 'Other' ? form.customCity.trim() : form.city;
    if (!effectiveCity) {
      newErrors.city = 'Please select or enter your city.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Prevent double submission if already in progress
    if (isSubmittingRef.current || submissionState === 'submitting') {
      return;
    }

    // Rate-limiting / submission cooldown (prevent rapid repeated requests within 3 seconds)
    const now = Date.now();
    if (now - lastSubmittedAt < 3000) {
      return;
    }
    setLastSubmittedAt(now);

    // Spam honeypot detection: bots fill hidden fax field
    if (form.faxNumber && form.faxNumber.trim().length > 0) {
      // Silently reject bot submission without alerting bot
      setSubmissionState('submitting');
      setTimeout(() => {
        setSubmissionState('idle');
      }, 1000);
      return;
    }

    // Validate fields
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    const effectiveCity = form.city === 'Other' ? form.customCity.trim() : form.city;
    const rawItems = items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));

    // Rebuild and verify order against centralized catalog
    const verificationResult = verifyAndCreateOrder(
      {
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: effectiveCity,
      },
      rawItems,
      form.notes
    );

    if (!verificationResult.order || verificationResult.error) {
      setSubmitError(
        verificationResult.error ||
          'Unable to verify items in your cart. Please check that products are in stock.'
      );
      setSubmissionState('error');
      return;
    }

    const newOrder = verificationResult.order;

    isSubmittingRef.current = true;
    setSubmissionState('submitting');

    try {
      // Dispatch order notifications via EmailJS
      const emailResult = await sendOrderEmails(newOrder);

      if (!emailResult.success) {
        // Submission failed: keep cart intact, enable retry
        setSubmitError(
          emailResult.error ||
            "We couldn't submit your order right now. Please try again or reach out to our team on WhatsApp."
        );
        setSubmissionState('error');
        isSubmittingRef.current = false;
        return;
      }

      // Persist order details to sessionStorage for /order-success review
      if (typeof window !== 'undefined') {
        try {
          window.sessionStorage.setItem('nexbyte_last_order', JSON.stringify(newOrder));
        } catch {
          // Session storage quota or private browsing mode fallback
        }
      }

      // Clear cart ONLY upon successful order dispatch
      clearCart();

      // Navigate to order-success page
      router.push(`/order-success?orderId=${encodeURIComponent(newOrder.id)}`);
    } catch {
      setSubmitError(
        "We couldn't submit your order right now. Please try again or contact us directly on WhatsApp."
      );
      setSubmissionState('error');
      isSubmittingRef.current = false;
    }
  };

  const effectiveCity = form.city === 'Other' ? form.customCity || 'Custom City' : form.city;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
        className="mb-4"
      />

      {/* Header */}
      <div className="pb-4 border-b border-slate-200 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout & Order Confirmation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide your delivery details. We will contact you personally to confirm shipping charges and dispatch your order.
        </p>
      </div>

      {/* Error Banner with Retry & WhatsApp Fallback */}
      {submitError && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-xs text-red-800 space-y-2">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="block font-bold text-red-900">Order Submission Notice</strong>
              <p className="mt-0.5 leading-relaxed">{submitError}</p>
            </div>
          </div>
          <div className="pl-6.5 flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={submissionState === 'submitting'}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-semibold text-[11px] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Try Again</span>
            </button>
            <a
              href="https://wa.me/923006392983?text=Hi%20NexByte,%20I%20am%20having%20trouble%20submitting%20my%20order%20on%20the%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>Help on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Single-Page Checkout Grid */}
      <form onSubmit={handleSubmitOrder} noValidate>
        {/* Honeypot Spam Protection Field (Hidden from real users) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <label htmlFor="faxNumber">Do not fill this field</label>
          <input
            id="faxNumber"
            name="faxNumber"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.faxNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Customer Form & Payment Notice (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Information Card */}
            <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                1. Delivery Information
              </h2>

              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold text-slate-800"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleInputChange}
                  className={`w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-300 focus:border-blue-600'
                  } focus:outline-none placeholder:text-slate-400`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="03XX XXXXXXX"
                    value={form.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border ${
                      errors.phone
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-blue-600'
                    } focus:outline-none placeholder:text-slate-400`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleInputChange}
                    className={`w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border ${
                      errors.email
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-blue-600'
                    } focus:outline-none placeholder:text-slate-400`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* City Selection */}
              <div className="space-y-1">
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-slate-800"
                >
                  City <span className="text-red-600">*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className={`w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border ${
                    errors.city
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-300 focus:border-blue-600'
                  } focus:outline-none text-slate-800`}
                >
                  <option value="">Select your city</option>
                  {PAKISTAN_MAJOR_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-[11px] text-red-600 font-medium">{errors.city}</p>
                )}
              </div>

              {/* If "Other" city is selected, show custom city input */}
              {form.city === 'Other' && (
                <div className="space-y-1 pl-0.5">
                  <label
                    htmlFor="customCity"
                    className="block text-xs font-semibold text-slate-800"
                  >
                    Specify Your City / District <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="customCity"
                    name="customCity"
                    type="text"
                    placeholder="Enter your city or district name"
                    value={form.customCity}
                    onChange={handleInputChange}
                    className="w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border border-slate-300 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              )}

              {/* Complete Delivery Address */}
              <div className="space-y-1">
                <label
                  htmlFor="address"
                  className="block text-xs font-semibold text-slate-800"
                >
                  Complete Delivery Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  autoComplete="street-address"
                  placeholder="House / Apartment number, Street name, Sector / Area / Landmark"
                  value={form.address}
                  onChange={handleInputChange}
                  className={`w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border ${
                    errors.address
                      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-300 focus:border-blue-600'
                  } focus:outline-none placeholder:text-slate-400`}
                />
                {errors.address && (
                  <p className="text-[11px] text-red-600 font-medium">{errors.address}</p>
                )}
              </div>

              {/* Order Notes (Optional) */}
              <div className="space-y-1">
                <label
                  htmlFor="notes"
                  className="block text-xs font-semibold text-slate-800"
                >
                  Order Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  placeholder="Special instructions for delivery (e.g. deliver after 3pm, call before arrival)..."
                  value={form.notes}
                  onChange={handleInputChange}
                  className="w-full bg-white text-xs sm:text-sm rounded-md px-3 py-2 border border-slate-300 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Payment & Shipping Policy Notice Card */}
            <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>2. Payment & Shipping Policy</span>
                <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                  Personal Confirmation
                </span>
              </h2>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <PhoneCall className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      Payment Details Confirmed Personally
                    </strong>
                    <span>
                      After submitting your order, the NexByte team will contact you directly via WhatsApp or phone call to confirm exact shipping charges for your city and provide payment details (Cash on Delivery, Raast, or Direct Bank Transfer).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">
                      No Upfront Online Card Charge
                    </strong>
                    <span>
                      No debit or credit card is charged online. You have full transparency before payment and courier dispatch.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pre-submission Review Section */}
            <div className="p-4 rounded-md bg-white border border-slate-200 space-y-2.5 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1.5 border-b border-slate-100">
                3. Customer Information Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Recipient</span>
                  <span className="text-slate-900 font-medium">
                    {form.fullName.trim() || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                  <span className="text-slate-900 font-medium">
                    {form.phone.trim() || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                  <span className="text-slate-900 font-medium">
                    {form.email.trim() || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Destination City</span>
                  <span className="text-slate-900 font-medium">
                    {effectiveCity || '—'}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Delivery Address</span>
                  <span className="text-slate-900 font-medium">
                    {form.address.trim() ? `${form.address}, ${effectiveCity || ''}` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Order Summary
                </h2>
                <span className="text-xs font-mono text-slate-500">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1 space-y-2">
                {items.map((item) => (
                  <div key={item.productId} className="pt-2 first:pt-0 flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                      <Image
                        src={getProductImageUrl(item.product.thumbnail || item.product.images?.[0])}
                        alt={item.product.name}
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
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>Qty: <strong>{item.quantity}</strong></span>
                        <span>&bull;</span>
                        <span className="font-mono">{formatPKR(item.unitPrice)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {formatPKR(item.lineSubtotal)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Totals */}
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold font-mono text-sm">
                    {formatPKR(subtotal)}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="text-slate-500 italic text-[11px]">To be confirmed</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {shippingNote}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-sm font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-slate-500 font-normal text-xs italic">
                    To be confirmed
                  </span>
                </div>
              </div>

              {/* Final Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submissionState === 'submitting'}
                  className={`w-full py-3.5 px-4 rounded-md font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    submissionState === 'submitting'
                      ? 'bg-blue-400 text-white cursor-wait'
                      : 'bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800'
                  }`}
                >
                  {submissionState === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Place Order</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/cart"
                  className="text-xs text-slate-500 hover:text-blue-600 hover:underline inline-block"
                >
                  &larr; Return to Cart
                </Link>
              </div>

              <p className="text-[10px] text-center text-slate-400 pt-2 border-t border-slate-100 leading-relaxed">
                By placing your order, our representative will contact you to verify details before dispatch.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
