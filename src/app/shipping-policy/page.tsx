import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import {
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Policy | NexByte Pakistan',
  description:
    'Nationwide courier delivery guidelines, location-based shipping charges, transit timelines, and parcel inspection terms for NexByte Pakistan.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Shipping Policy' }]} className="mb-2" />

      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Store Guidelines
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          NexByte provides reliable nationwide delivery across all cities, districts, and regions in Pakistan. Review our shipping procedures, location-based rates, and delivery timelines below.
        </p>
      </div>

      {/* Delivery Timelines Card */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Estimated Delivery Timelines</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          <div className="p-4 bg-slate-50 rounded-md border border-slate-200/80 space-y-1">
            <span className="font-bold text-xs text-slate-900 block">
              Islamabad & Rawalpindi
            </span>
            <span className="text-base font-bold text-blue-700 font-mono">
              1 – 2 Business Days
            </span>
            <p className="text-[11px] text-slate-500">
              Direct dispatch from our Islamabad central hub.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-200/80 space-y-1">
            <span className="font-bold text-xs text-slate-900 block">
              Major Provincial Hubs
            </span>
            <span className="text-base font-bold text-blue-700 font-mono">
              2 – 3 Business Days
            </span>
            <p className="text-[11px] text-slate-500">
              Lahore, Karachi, Peshawar, Faisalabad, Multan, Sialkot, Gujranwala.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-200/80 space-y-1">
            <span className="font-bold text-xs text-slate-900 block">
              Other Nationwide Regions
            </span>
            <span className="text-base font-bold text-blue-700 font-mono">
              3 – 5 Business Days
            </span>
            <p className="text-[11px] text-slate-500">
              All other cities, rural districts, AJ&K, and Gilgit-Baltistan.
            </p>
          </div>
        </div>
      </div>

      {/* Structured Sections */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        {/* Section 1: Shipping Charges */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>1. Location-Based Shipping Charges</span>
          </h2>
          <p className="text-slate-600">
            Shipping charges in Pakistan depend upon the destination city, total parcel weight, and volumetric dimensions (particularly for high-refresh monitors and heavier accessories).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              <strong>No Arbitrary Fees:</strong> We do not apply a generic fixed shipping cost during online checkout.
            </li>
            <li>
              <strong>Personal Confirmation:</strong> After your order is placed, a NexByte team member will contact you directly to confirm the exact shipping fee charged by our courier partner for your destination.
            </li>
            <li>
              <strong>Total Transparency:</strong> You will always be informed of the exact shipping charge before payment is finalized and before your parcel is dispatched.
            </li>
          </ul>
        </section>

        {/* Section 2: Courier Partners & Tracking */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>2. Courier Services & Tracking</span>
          </h2>
          <p className="text-slate-600">
            We partner with established domestic courier logistics including <strong>TCS, Leopards Courier, Trax, and PostEx</strong> to ensure reliable nationwide transit.
          </p>
          <p className="text-slate-600">
            Once your order is confirmed and handed over to the courier, an official tracking number / consignment note (CN) will be shared with you via WhatsApp or SMS so you can monitor your parcel’s progress in real-time.
          </p>
        </section>

        {/* Section 3: Customer Responsibility */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-blue-600" />
            <span>3. Accurate Address & Contact Information</span>
          </h2>
          <p className="text-slate-600">
            To prevent delivery delays or returned packages, customers are requested to ensure:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>
              A complete street address including house/building number, street name, and prominent nearby landmarks.
            </li>
            <li>
              An active, accessible Pakistani phone number where the courier rider can call prior to arrival.
            </li>
            <li>
              An authorized person is available to receive the package at the designated address during working hours.
            </li>
          </ul>
        </section>

        {/* Section 4: Protective Packaging & Inspection */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>4. Packaging & Parcel Inspection</span>
          </h2>
          <p className="text-slate-600">
            All delicate electronics—especially monitors, optical mice sensors, and mechanical keyboards—are reinforced with multi-layer bubble wrap and rigid packaging to withstand inter-city transit.
          </p>
          <div className="p-3.5 rounded bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
            <strong className="block font-semibold">Recommended Unboxing Practice:</strong>
            <p className="text-[11px] leading-relaxed text-blue-800">
              We strongly advise recording a continuous unboxing video when opening your package for the first time. In the rare event of transit damage, this allows us to quickly process a courier insurance claim and expedite your replacement.
            </p>
          </div>
        </section>
      </div>

      {/* Support Prompt */}
      <div className="p-6 rounded-md bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Need a shipping quote for your city before ordering?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Share your city name and the product you wish to purchase on WhatsApp.
          </p>
        </div>

        <WhatsAppButton
          message="Hi NexByte, I would like to inquire about shipping charges to my city."
          label="Inquire on WhatsApp"
        />
      </div>
    </div>
  );
}
