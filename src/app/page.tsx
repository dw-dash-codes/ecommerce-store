import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { HeroBanner } from '@/components/home/HeroBanner';
import {
  ArrowRight,
  Monitor,
  Mouse,
  Keyboard,
  Headphones,
  Sliders,
  Truck,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Star,
} from 'lucide-react';

import { siteConfig } from '@/config/site';

export default function HomePage() {
  // 1. Featured Products (4 items)
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  // 2. Sale / Special Deals (items with salePrice < price, 4 items)
  const saleProducts = products
    .filter((p) => p.salePrice && p.salePrice < p.price)
    .slice(0, 4);

  // 3. Latest Products (4 items)
  const latestProducts = products.filter((p) => p.isNew).slice(0, 4);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'monitors':
        return <Monitor className="w-8 h-8 text-blue-600" />;
      case 'mice':
      case 'gaming-mice':
        return <Mouse className="w-8 h-8 text-blue-600" />;
      case 'keyboards':
        return <Keyboard className="w-8 h-8 text-blue-600" />;
      case 'headsets':
        return <Headphones className="w-8 h-8 text-blue-600" />;
      default:
        return <Sliders className="w-8 h-8 text-blue-600" />;
    }
  };

  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: siteConfig.name,
    description: siteConfig.description,
    url: 'https://nexbyte.pk',
    telephone: siteConfig.contact.phoneDisplay,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash on Delivery, Raast, Direct Bank Transfer',
    priceRange: 'PKR 1,500 - PKR 90,000',
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />

      {/* =========================================================================
          1. REDESIGNED HERO BANNER (Visual Hardware Photography Carousel)
      ========================================================================= */}
      <HeroBanner />

      {/* =========================================================================
          2. SHOP BY CATEGORY
      ========================================================================= */}
      <section id="categories" className="py-10 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Shop by Category
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse computer accessories and hardware by department.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
              className="group bg-white border border-slate-200 hover:border-blue-500 rounded-md p-4 text-center hover:shadow-md transition-all flex flex-col items-center justify-between"
            >
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
                {getCategoryIcon(category.slug)}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] text-slate-400 block font-mono">
                  {category.itemCount} Items
                </span>
              </div>
              <span className="text-[11px] text-blue-600 font-semibold mt-3 flex items-center gap-1 group-hover:underline">
                Explore &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED PRODUCTS (Clean Cards with No Distracting Badges)
      ========================================================================= */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Featured Products
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Popular computer peripherals and displays.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      {/* =========================================================================
          4. SPECIAL SELECTIONS / PRODUCTS
      ========================================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Special Deals & Hardware
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High performance computer hardware and gaming gear.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            See All &rarr;
          </Link>
        </div>

        <ProductGrid products={saleProducts} columns={4} />
      </section>

      {/* =========================================================================
          5. PROMOTIONAL BANNER
      ========================================================================= */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Computer Accessories & Peripherals
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Build Your Perfect Setup
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Discover gaming and computer gear from Logitech, AOC, MSI, HyperX, Attack Shark, and ATK. Nationwide delivery across Pakistan.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors flex-shrink-0 shadow-sm"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          6. LATEST PRODUCTS
      ========================================================================= */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Latest Arrivals
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                New products recently added to our Pakistan inventory.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Browse Latest &rarr;
            </Link>
          </div>

          <ProductGrid products={latestProducts} columns={4} />
        </div>
      </section>

      {/* =========================================================================
          7. BRANDS
      ========================================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-3 mb-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Brands Available at NexByte
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Quality hardware from established computer and gaming peripheral manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${brand.slug}`}
              className="p-4 rounded-md bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all text-center group"
            >
              <span className="block font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {brand.origin}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. WHY SHOP WITH NEXBYTE (Factual Trust Benefits)
      ========================================================================= */}
      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-lg mx-auto mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Why Shop With NexByte
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Factual, transparent service for computer accessories across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-md border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Nationwide Delivery
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Courier delivery across Islamabad, Rawalpindi, Lahore, Karachi, and all cities in Pakistan.
              </p>
            </div>

            <div className="bg-white p-5 rounded-md border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Simple Ordering
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Order online with Cash on Delivery, Raast, or Direct Bank Transfer without complicated steps.
              </p>
            </div>

            <div className="bg-white p-5 rounded-md border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Warranty Support
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Warranty information clearly specified on each product page for your transparency.
              </p>
            </div>

            <div className="bg-white p-5 rounded-md border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Customer Support
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reach our team directly on WhatsApp or phone for product questions and stock updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CUSTOMER REVIEWS (Realistic Feedback)
      ========================================================================= */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-3 mb-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Customer Feedback
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Feedback from customers who purchased peripherals through NexByte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-md bg-white border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Ordered the AOC 24G2SP monitor. Received in Rawalpindi with safe bubble wrap packaging. Zero issues.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-900 block">Hamza Tariq</span>
              <span className="text-[11px] text-slate-400">Rawalpindi, Pakistan</span>
            </div>
          </div>

          <div className="p-5 rounded-md bg-white border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;The Attack Shark X3 mouse is extremely light and works great on my setup. Responsive support on WhatsApp before ordering.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-900 block">Arsalan Sheikh</span>
              <span className="text-[11px] text-slate-400">Karachi, Pakistan</span>
            </div>
          </div>

          <div className="p-5 rounded-md bg-white border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Got the Attack Shark K86 mechanical keyboard. Great typing sound and knob control. Delivery was smooth via Leopards.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-900 block">Taha Hashmi</span>
              <span className="text-[11px] text-slate-400">Islamabad, Pakistan</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FINAL SHOPPING CTA
      ========================================================================= */}
      <section className="py-10 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Ready to Explore the Catalog?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Browse our complete inventory of gaming mice, keyboards, monitors, and computer accessories with nationwide shipping.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
