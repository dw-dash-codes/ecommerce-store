'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[NexByte Client Error]:', error);
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-md bg-white border border-slate-200 text-center shadow-xs space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block mb-1">
            Temporary Issue
          </span>
          <h1 className="text-xl font-bold text-slate-900">
            Something Went Wrong
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            An unexpected error occurred while loading this page. You can try refreshing the view or return to our storefront.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 mb-2">
            Need urgent assistance with an order?
          </p>
          <WhatsAppButton
            className="w-full"
            message="Hi NexByte, I ran into an error on the website."
            label="Contact Support on WhatsApp"
          />
        </div>
      </div>
    </div>
  );
}
