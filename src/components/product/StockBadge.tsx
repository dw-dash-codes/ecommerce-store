import React from 'react';
import { StockStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Check, AlertCircle, XCircle, Clock } from 'lucide-react';

export interface StockBadgeProps {
  status: StockStatus;
  quantity?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function StockBadge({ status, quantity, size = 'sm', className }: StockBadgeProps) {
  const configs = {
    in_stock: {
      label: 'In Stock',
      icon: Check,
      styles: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    low_stock: {
      label: quantity ? `Only ${quantity} left` : 'Low Stock',
      icon: AlertCircle,
      styles: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    out_of_stock: {
      label: 'Out of Stock',
      icon: XCircle,
      styles: 'text-slate-500 bg-slate-100 border-slate-200',
    },
    pre_order: {
      label: 'Pre-Order',
      icon: Clock,
      styles: 'text-blue-700 bg-blue-50 border-blue-200',
    },
  };

  const config = configs[status] || configs.in_stock;
  const Icon = config.icon;

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded border',
        config.styles,
        sizeStyles[size],
        className
      )}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
}
