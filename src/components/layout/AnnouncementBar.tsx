'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function AnnouncementBar() {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-[11px] sm:text-xs">
          <span>Nationwide Delivery Across Pakistan • {siteConfig.contact.locationText}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Helpline / WhatsApp: {siteConfig.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
