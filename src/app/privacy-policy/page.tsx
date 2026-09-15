import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Lock, EyeOff, FileText, Mail } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | NexByte Pakistan',
  description:
    'Privacy Policy for NexByte Pakistan — details on how we collect, use, and protect customer personal information during orders and inquiries.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} className="mb-2" />

      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Customer Protection
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          At NexByte, we respect customer privacy and are committed to safeguarding personal information collected when you browse our store, place orders, or contact support.
        </p>
      </div>

      {/* Key Principles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-md bg-white border border-slate-200 shadow-xs space-y-1.5">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">Order Fulfillment Only</h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Data is strictly collected to process and dispatch your ordered products.
          </p>
        </div>

        <div className="p-4 rounded-md bg-white border border-slate-200 shadow-xs space-y-1.5">
          <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">No Selling of Data</h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            We never sell, rent, or trade your contact info to third-party marketing lists.
          </p>
        </div>

        <div className="p-4 rounded-md bg-white border border-slate-200 shadow-xs space-y-1.5">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">Zero Payment Storage</h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            No bank or card details are ever processed or stored on our servers.
          </p>
        </div>
      </div>

      {/* Structured Sections */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>1. Information We Collect</span>
          </h2>
          <p className="text-slate-600">
            When you interact with NexByte through our checkout portal or contact forms, we collect the necessary information to fulfill your request:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Full Name:</strong> To address the parcel correctly.</li>
            <li><strong>Phone Number:</strong> To contact you for order confirmation and allow the courier rider to call upon arrival.</li>
            <li><strong>Delivery Address & City:</strong> To calculate logistics fees and execute physical parcel delivery.</li>
            <li><strong>Email Address:</strong> To deliver order receipts and operational notifications.</li>
            <li><strong>Order Notes:</strong> Any specific handling or delivery instructions provided by you.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>2. How We Use Your Information</span>
          </h2>
          <p className="text-slate-600">
            Customer details are utilized solely for legitimate operational purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Generating invoices and assigning unique order identifiers.</li>
            <li>Booking consignments with domestic courier services (TCS, Leopards, Trax).</li>
            <li>Communicating via WhatsApp, phone, or email regarding stock status, delivery fees, or warranty assistance.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>3. Payment & Financial Privacy</span>
          </h2>
          <p className="text-slate-600">
            NexByte does not operate an automated online card charging gateway. All payments are completed personally via Cash on Delivery, Raast Instant Pay, or direct Bank Wire. As a result, no debit card numbers, credit card CVVs, or bank account credentials are ever collected or stored on our platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-blue-600" />
            <span>4. Third-Party Sharing</span>
          </h2>
          <p className="text-slate-600">
            We share customer contact and delivery details strictly with our contracted courier partners solely to execute parcel transit. We do not provide, rent, or sell customer contact information to third-party telemarketers or advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>5. Contact for Privacy Questions</span>
          </h2>
          <p className="text-slate-600">
            If you have any questions regarding your information or wish to update your contact record, please contact our support desk at <a href={`mailto:${siteConfig.contact.email}`} className="text-blue-600 font-semibold hover:underline">{siteConfig.contact.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
