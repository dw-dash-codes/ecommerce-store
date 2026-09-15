'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPKR } from '@/lib/formatters';
import { SearchBar } from '@/components/shop/SearchBar';
import { Logo } from '@/components/common/Logo';
import { siteConfig } from '@/config/site';
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Phone,
} from 'lucide-react';

export function Header() {
  const { itemCount, subtotal, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Monitors', href: '/shop/monitors' },
    { label: 'Mice', href: '/shop/mice' },
    { label: 'Keyboards', href: '/shop/keyboards' },
    { label: 'Headsets', href: '/shop/headsets' },
    { label: 'Accessories', href: '/shop/accessories' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* NexByte Logo */}
          <Logo />

          {/* Large Search Bar (Central E-Commerce Search with live Autocomplete) */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <SearchBar placeholder="Search monitors, mice, keyboards, headsets, SKU..." />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 text-xs text-slate-700 hover:text-blue-600"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <Phone className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 leading-none">Need help?</span>
                <span className="font-semibold text-slate-900">{siteConfig.contact.phoneDisplay}</span>
              </div>
            </a>

            {/* Wishlist Header Icon Button */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-md hover:bg-slate-50 border border-slate-200 text-slate-800 transition-colors flex items-center justify-center"
              aria-label={`View Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-5 h-5 text-slate-800" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={openCart}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer text-slate-900"
              aria-label={`View Shopping Cart (${itemCount} items)`}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-slate-800" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none pl-1">
                <span className="text-[10px] text-slate-500 font-medium">Cart</span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {formatPKR(subtotal)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Row with Autocomplete */}
        <div className="md:hidden pb-3">
          <SearchBar placeholder="Search products, brands, SKU..." />
        </div>
      </div>

      {/* Main Store Navigation Bar */}
      <nav className="hidden lg:block bg-slate-50 border-t border-slate-200 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-block py-2.5 px-3 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-slate-700 hover:text-blue-600 font-medium border-b border-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
