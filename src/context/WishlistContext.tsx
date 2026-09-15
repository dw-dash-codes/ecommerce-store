'use client';

import React, { createContext, useContext, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Product } from '@/types';
import { getProductById } from '@/lib/products';
import { useToast } from './ToastContext';

interface WishlistContextType {
  productIds: string[];
  products: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'nexbyte_wishlist_v1';
const WISHLIST_EVENT = 'nexbyte_wishlist_updated';

function subscribeWishlist(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(WISHLIST_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(WISHLIST_EVENT, callback);
  };
}

function getWishlistSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getServerWishlistSnapshot(): string {
  return '[]';
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const wishlistJson = useSyncExternalStore(
    subscribeWishlist,
    getWishlistSnapshot,
    getServerWishlistSnapshot
  );

  const productIds = useMemo<string[]>(() => {
    try {
      const parsed = JSON.parse(wishlistJson);
      if (Array.isArray(parsed)) {
        return parsed.filter((id) => typeof id === 'string');
      }
    } catch {
      return [];
    }
    return [];
  }, [wishlistJson]);

  const saveProductIds = useCallback((ids: string[]) => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event(WISHLIST_EVENT));
    } catch {
      // Storage unavailable or quota exceeded
    }
  }, []);

  // Derive products that actually exist in catalog
  const products = useMemo(() => {
    return productIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined);
  }, [productIds]);

  const wishlistCount = products.length;

  const isInWishlist = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const addToWishlist = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) return;
      const updated = [...productIds, productId];
      saveProductIds(updated);

      const prod = getProductById(productId);
      const name = prod ? prod.name : 'Product';
      toast(`${name.length > 25 ? name.substring(0, 25) + '...' : name} added to wishlist`, 'success');
    },
    [productIds, saveProductIds, toast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      const updated = productIds.filter((id) => id !== productId);
      saveProductIds(updated);

      const prod = getProductById(productId);
      const name = prod ? prod.name : 'Product';
      toast(`${name.length > 25 ? name.substring(0, 25) + '...' : name} removed from wishlist`, 'info');
    },
    [productIds, saveProductIds, toast]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  const clearWishlist = useCallback(() => {
    saveProductIds([]);
    toast('Wishlist cleared', 'info');
  }, [saveProductIds, toast]);

  return (
    <WishlistContext.Provider
      value={{
        productIds,
        products,
        wishlistCount,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
