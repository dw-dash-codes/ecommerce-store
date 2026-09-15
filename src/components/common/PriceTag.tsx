import React from 'react';
import { formatPKR, calculateDiscountPercentage } from '@/lib/formatters';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export interface PriceTagProps {
  price: number;
  salePrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscountBadge?: boolean;
  className?: string;
  forceShowDiscounts?: boolean;
}

export function PriceTag({
  price,
  salePrice,
  size = 'md',
  showDiscountBadge = true,
  className,
  forceShowDiscounts = false,
}: PriceTagProps) {
  const showDiscounts = forceShowDiscounts || siteConfig.features.showDiscounts;
  const hasDiscount = showDiscounts && salePrice !== undefined && salePrice < price;
  const discountPercent = calculateDiscountPercentage(price, salePrice);
  const effectivePrice = salePrice !== undefined && salePrice < price ? salePrice : price;

  const priceSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-bold',
    lg: 'text-lg font-bold',
    xl: 'text-2xl lg:text-3xl font-black',
  };

  const originalSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  };

  return (
    <div className={cn('flex items-baseline flex-wrap gap-1.5', className)}>
      <span
        className={cn(
          'tracking-tight font-mono',
          hasDiscount ? 'text-red-600 font-bold' : 'text-slate-900 font-bold',
          priceSizes[size]
        )}
      >
        {formatPKR(effectivePrice)}
      </span>

      {hasDiscount && (
        <>
          <span className={cn('line-through text-slate-400 font-normal font-mono', originalSizes[size])}>
            {formatPKR(price)}
          </span>

          {showDiscountBadge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white leading-none">
              -{discountPercent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
