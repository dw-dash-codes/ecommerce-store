import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FileText, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms and Conditions | NexByte Pakistan',
  description:
    'Standard commercial terms, order fulfillment rules, pricing, warranty coverage, and customer responsibilities for NexByte Pakistan.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} className="mb-2" />

      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Store Agreement
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Welcome to NexByte. These Terms and Conditions govern all product orders, payment arrangements, shipping, and return requests placed through our website.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        {/* 1. General Agreement */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>1. General Agreement & Store Operations</span>
          </h2>
          <p className="text-slate-600">
            By browsing our website, creating an order request, or interacting with our team, you agree to comply with these terms. NexByte operates as an online computer accessories retailer based in Islamabad, Pakistan, fulfilling nationwide courier deliveries.
          </p>
        </section>

        {/* 2. Order Submission & Acceptance */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>2. Orders & Verification</span>
          </h2>
          <p className="text-slate-600">
            Placing an order through our checkout generates a pending order request with a unique ID (e.g., `NXB-YYYYMMDD-XXXX`). An order is considered formally accepted and booked for dispatch only after our team confirms delivery charges and payment arrangements with you directly via WhatsApp or phone.
          </p>
          <p className="text-slate-600">
            NexByte reserves the right to decline or cancel an order in cases of stock exhaustion, unverified customer phone numbers, or delivery destinations unsupported by courier logistics.
          </p>
        </section>

        {/* 3. Pricing & Currency */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>3. Pricing & Currency</span>
          </h2>
          <p className="text-slate-600">
            All prices listed on NexByte are in Pakistani Rupees (PKR). We strive for absolute pricing accuracy; however, in the event of an inadvertent technical error, the price verified in our centralized catalog at the time of manual confirmation shall apply.
          </p>
        </section>

        {/* 4. Payment Terms */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>4. Payment Methods & Confirmation</span>
          </h2>
          <p className="text-slate-600">
            No automated online debit or credit card payments are collected on this website. Accepted payment options include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Cash on Delivery (COD) across serviceable cities.</li>
            <li>Raast Instant Pay (State Bank of Pakistan digital rail).</li>
            <li>Direct Bank Transfer (Meezan Bank, HBL, Bank Alfalah).</li>
            <li>JazzCash / EasyPaisa wallet transfer.</li>
          </ul>
        </section>

        {/* 5. Shipping & Courier Logistics */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>5. Shipping & Delivery Terms</span>
          </h2>
          <p className="text-slate-600">
            Shipping charges depend on the recipient’s city and parcel volumetric weight and are confirmed with the customer before dispatch. While we aim to fulfill orders within standard transit windows (1–3 business days for major cities, 3–5 days nationwide), delivery times are subject to courier handling and local weather or regional conditions.
          </p>
        </section>

        {/* 6. Returns, Replacements & Warranties */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span>6. Returns & Warranty Claims</span>
          </h2>
          <p className="text-slate-600">
            Hardware items with manufacturing faults or transit damages must be reported within <strong>7 days</strong> of delivery as detailed in our <a href="/return-policy" className="text-blue-600 font-semibold hover:underline">Return Policy</a>. Product warranties apply strictly to factory manufacturing defects and do not cover physical drops, liquid damage, or electrical burnouts.
          </p>
        </section>

        {/* 7. Customer Responsibilities */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>7. Customer Information Accuracy</span>
          </h2>
          <p className="text-slate-600">
            Customers are responsible for providing an accurate name, active mobile number, and complete delivery address. NexByte is not liable for courier delays resulting from incorrect address inputs or unreachable phone numbers.
          </p>
        </section>

        {/* 8. Intellectual Property & Trademarks */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>8. Trademarks</span>
          </h2>
          <p className="text-slate-600">
            All brand names, product titles, and logos (Logitech, Attack Shark, ATK, MSI, HyperX, AOC) belong to their respective trademark holders and are utilized solely for authentic product identification.
          </p>
        </section>
      </div>
    </div>
  );
}
