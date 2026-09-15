import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8">
      <div className="h-4 bg-slate-200 rounded w-64 mb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded border border-slate-200" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="h-4 bg-slate-200 rounded w-20" />
          <div className="h-8 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-32" />
          <div className="h-8 bg-slate-200 rounded w-40 mt-4" />
          <div className="h-24 bg-slate-100 rounded border border-slate-200 mt-4" />
          <div className="h-12 bg-slate-200 rounded mt-4" />
        </div>
      </div>
    </div>
  );
}
