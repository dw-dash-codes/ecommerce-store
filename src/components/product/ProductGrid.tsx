import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
  emptyTitle?: string;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  columns = 4,
  className,
  emptyTitle = 'No Products Found',
  emptyMessage = 'We could not find any products matching your current selection.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg bg-slate-50 border border-slate-200 my-6">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <PackageOpen className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">{emptyTitle}</h3>
        <p className="text-xs text-slate-500 max-w-sm">{emptyMessage}</p>
      </div>
    );
  }

  const columnStyles =
    columns === 4
      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5'
      : 'grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5';

  return (
    <div className={cn(columnStyles, className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
