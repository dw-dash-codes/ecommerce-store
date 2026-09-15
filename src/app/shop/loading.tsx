import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
      <div className="h-4 bg-slate-200 rounded w-48 mb-4" />

      {/* Header skeleton */}
      <div className="h-8 bg-slate-200 rounded w-64 mb-2" />
      <div className="h-4 bg-slate-100 rounded w-96 mb-6" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block space-y-4">
          <div className="h-40 bg-slate-100 rounded-md border border-slate-200" />
          <div className="h-40 bg-slate-100 rounded-md border border-slate-200" />
        </div>

        {/* Products skeleton */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-md bg-white border border-slate-200 space-y-3"
            >
              <div className="aspect-square bg-slate-100 rounded flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
              </div>
              <div className="h-3 bg-slate-200 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
