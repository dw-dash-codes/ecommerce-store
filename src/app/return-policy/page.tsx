import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/config/site';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';

export const metadata = {
  title: 'Return & Replacement Policy | NexByte Pakistan',
  description:
    'Return, exchange, and replacement terms for computer accessories and peripherals purchased from NexByte Pakistan.',
};

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Return Policy' }]} className="mb-2" />

      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Store Policies
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Return & Replacement Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          NexByte is committed to providing authentic, fully functional computer hardware. Please review our conditions for reporting transit issues, dead-on-arrival (DOA) units, and warranty claims below.
        </p>
      </div>

      {/* Primary 7-Day Window Card */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded bg-blue-50 text-blue-600 shrink-0 mt-0.5">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              7-Day Checking & Replacement Window
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              If an item is received with transit damage or exhibits a manufacturing defect immediately upon unboxing, customers must notify NexByte within <strong>7 calendar days</strong> of parcel receipt to qualify for a replacement check.
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Covered Scenarios */}
        <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Eligible for Replacement</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc leading-relaxed">
            <li>
              <strong>Dead on Arrival (DOA):</strong> Hardware fails to power on or function straight out of the sealed box.
            </li>
            <li>
              <strong>Documented Transit Damage:</strong> External or internal damage incurred during courier handling (supported by unboxing photo/video).
            </li>
            <li>
              <strong>Incorrect Product Delivered:</strong> Mismatch between the SKU/model ordered and the item received.
            </li>
            <li>
              <strong>Factory Hardware Fault:</strong> Non-working switch, defective monitor panel line, or faulty optical sensor verified during testing.
            </li>
          </ul>
        </div>

        {/* Non-Covered Scenarios */}
        <div className="p-5 rounded-md bg-white border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <XCircle className="w-4 h-4 text-red-600" />
            <span>Ineligible for Return</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc leading-relaxed">
            <li>
              <strong>Physical Customer Damage:</strong> Drops, cracked monitor panels, torn cables, or stripped screws after delivery.
            </li>
            <li>
              <strong>Electrical Surges & Liquid Spills:</strong> Damage resulting from voltage spikes or liquid ingress.
            </li>
            <li>
              <strong>Missing Packaging / Accessories:</strong> Items returned without their original retail box, documentation, cables, or serial stickers.
            </li>
            <li>
              <strong>Change of Mind:</strong> Opened electronics without functional defect (subject to store discretion).
            </li>
          </ul>
        </div>
      </div>

      {/* Step-by-Step Claim Process */}
      <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-4 text-xs text-slate-700 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>How to Initiate a Replacement Request</span>
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold">Contact Support:</strong>
              <span>
                Message our Islamabad support desk on WhatsApp at <strong>{siteConfig.contact.phoneDisplay}</strong> or email <strong>{siteConfig.contact.email}</strong>.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold">Provide Order Evidence:</strong>
              <span>
                Share your Order ID (e.g., `NXB-YYYYMMDD-XXXX`), serial number, and a short video or photo demonstrating the defect.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold">Evaluation & Dispatch:</strong>
              <span>
                Upon initial review, we will provide dispatch instructions to return the item to our Islamabad inspection facility. Once inspected, an identical replacement will be arranged promptly.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Help Prompt Card */}
      <div className="p-6 rounded-md bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Need help with a recent order?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Our team is available on WhatsApp to guide you through warranty or replacement questions.
          </p>
        </div>

        <WhatsAppButton
          message="Hi NexByte, I have a question regarding a product replacement."
          label="Contact Support on WhatsApp"
        />
      </div>
    </div>
  );
}
