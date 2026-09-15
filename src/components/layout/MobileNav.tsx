'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Home, Grid, Search, ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop', icon: Grid },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Wishlist', href: '/wishlist', icon: Heart, count: wishlistCount },
  ];

  return (
    <nav aria-label="Mobile navigation bar" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-1.5 px-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-medium transition-colors relative',
                isActive ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Trigger Button */}
        <button
          type="button"
          onClick={openCart}
          className="flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-medium text-slate-600 hover:text-blue-600 transition-colors relative cursor-pointer"
          aria-label={`Open shopping cart (${itemCount} items)`}
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
}
