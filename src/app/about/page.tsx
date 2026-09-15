import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/config/site';
import {
  Monitor,
  Mouse,
  Keyboard,
  Headphones,
  Cpu,
  Truck,
  ShieldCheck,
  PhoneCall,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | NexByte Pakistan',
  description:
    'Learn about NexByte — an online computer accessories and gaming peripherals store based in Islamabad, delivering authentic hardware nationwide across Pakistan.',
};

export default function AboutPage() {
  const categoryIcons: Record<string, React.ReactNode> = {
    monitors: <Monitor className="w-5 h-5 text-blue-600" />,
    mice: <Mouse className="w-5 h-5 text-blue-600" />,
    keyboards: <Keyboard className="w-5 h-5 text-blue-600" />,
    headsets: <Headphones className="w-5 h-5 text-blue-600" />,
    accessories: <Cpu className="w-5 h-5 text-blue-600" />,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={[{ label: 'About NexByte' }]} className="mb-2" />

      {/* Header Section */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Store Overview
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About NexByte
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed max-w-3xl">
          NexByte is a Pakistan-based online computer accessories and gaming peripherals store operating from Islamabad. We specialize in bringing dependable, high-performance PC hardware, gaming monitors, mechanical keyboards, precision mice, and essential desk setup accessories to gamers, developers, and desktop professionals across Pakistan.
        </p>
      </div>

      {/* Core Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Nationwide Shipping</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Fast, insured courier dispatch across Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad, and all cities in Pakistan.
          </p>
        </div>

        <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Transparent Hardware</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every product listing includes accurate technical specifications, real SKU identifiers, and clear warranty coverage terms.
          </p>
        </div>

        <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Direct Personal Support</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our team personally confirms delivery details and shipping fees for every order via WhatsApp or phone call before parcel dispatch.
          </p>
        </div>
      </div>

      {/* What We Offer / Main Categories */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Product Categories
          </h2>
          <Link
            href="/shop"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {siteConfig.catalog.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="p-4 rounded-md bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                  {categoryIcons[cat.slug] || <Cpu className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Hardware Brands */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Featured Brands & Hardware Partners
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            We inventory and supply authentic peripherals from recognized industry manufacturers:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {siteConfig.catalog.brands.map((brand) => (
            <div
              key={brand}
              className="p-3 rounded bg-slate-50 border border-slate-200/80 text-center"
            >
              <span className="text-xs font-bold text-slate-800 tracking-tight">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Our Operational Standards */}
      <div className="p-5 sm:p-6 rounded-md bg-slate-50 border border-slate-200 space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Our Operational Standards
        </h2>
        <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Authentic Sourcing:</strong> All products are sourced from legitimate distribution channels with transparent brand and model specifications.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Safe Packaging:</strong> Fragile items, including high-refresh monitors and sensitive switches, are reinforced with heavy-duty protective packaging prior to courier handover.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Personal Order Verification:</strong> We never charge unseen fees. Before dispatching any parcel, we confirm exact delivery charges and timelines with you directly.
            </span>
          </li>
        </ul>
      </div>

      {/* Location & Contact CTA Card */}
      <div className="p-6 rounded-md bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-blue-700 font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{siteConfig.contact.locationText}</span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Have questions about an upcoming order or stock availability?
          </h2>
          <p className="text-xs text-slate-500">
            Reach out directly to our Islamabad support desk for immediate assistance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <WhatsAppButton message="Hi NexByte, I'd like to ask a question about your products." />
          <Link
            href="/contact"
            className="px-4 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors"
          >
            Contact Details
          </Link>
        </div>
      </div>
    </div>
  );
}
