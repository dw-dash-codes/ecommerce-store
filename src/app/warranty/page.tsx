import React from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Clock, Phone } from 'lucide-react';

export const metadata = {
  title: 'Warranty Information | NexByte Pakistan',
  description: 'Warranty terms and customer support information for computer accessories at NexByte.',
};

export default function WarrantyPage() {
  const brandWarranties = [
    { brand: 'AOC Monitors', duration: '3 Years Warranty', coverage: 'Display panel and internal electronics.' },
    { brand: 'MSI Monitors & Gear', duration: '3 Years Warranty', coverage: 'Rapid IPS panel and hardware components.' },
    { brand: 'Logitech G', duration: '2 Years Warranty', coverage: 'Sensor, wireless transceiver, and switches.' },
    { brand: 'HyperX', duration: '2 Years Warranty', coverage: 'Audio drivers and internal electronics.' },
    { brand: 'ATK', duration: '1 Year Warranty', coverage: 'Magnetic switches and sensor functionality.' },
    { brand: 'Attack Shark', duration: '6 – 10 Months Warranty', coverage: 'Sensor, wireless receiver, and PCB.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Warranty Information' }]} className="mb-4" />

      <div className="mb-6 pb-3 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Warranty Information
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Warranty coverage details for computer accessories and peripherals.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Table */}
        <div className="rounded-md border border-slate-200 overflow-hidden bg-white">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Product Warranty Coverage
            </h2>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {brandWarranties.map((item, i) => (
              <div key={i} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                    {item.brand}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {item.coverage}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium text-[11px] self-start sm:self-center border border-slate-200">
                  <Clock className="w-3 h-3 text-blue-600" />
                  {item.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Steps */}
        <div className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            How to File a Warranty Claim
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded border border-slate-200 space-y-1">
              <span className="font-bold text-blue-600 font-mono">1. Contact Us</span>
              <p className="text-slate-500 text-[11px]">
                WhatsApp support with your order number and issue description.
              </p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200 space-y-1">
              <span className="font-bold text-blue-600 font-mono">2. Inspection</span>
              <p className="text-slate-500 text-[11px]">
                Ship or drop off the item for technician testing.
              </p>
            </div>
            <div className="p-3 bg-white rounded border border-slate-200 space-y-1">
              <span className="font-bold text-blue-600 font-mono">3. Resolution</span>
              <p className="text-slate-500 text-[11px]">
                Replacement or service provided according to product warranty.
              </p>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="p-4 rounded-md bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-slate-700">
              Questions regarding warranty? WhatsApp: <strong>+92 300 6392983</strong>
            </span>
          </div>
          <a
            href="https://wa.me/923006392983?text=Hi%20NexByte,%20I%20have%20a%20warranty%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
