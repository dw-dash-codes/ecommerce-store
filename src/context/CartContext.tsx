'use client';

import React, { createContext, useContext, useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Product } from '@/types';
import { getProductById } from '@/lib/products';
import { useToast } from './ToastContext';

export interface RawCartItem {
  productId: string;
  quantity: number;
}

export interface PopulatedCartItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  lineSubtotal: number;
}

interface CartContextType {
  items: PopulatedCartItem[];
  itemCount: number;
  subtotal: number;
  shippingNote: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nexbyte_cart_v2';
const CART_EVENT = 'nexbyte_cart_updated';

function subscribeCart(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener(CART_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CART_EVENT, callback);
  };
}

function getCartSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getServerCartSnapshot(): string {
  return '[]';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // useSyncExternalStore ensures perfect SSR hydration and immediate client sync
  const cartJson = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);

  const rawItems = useMemo<RawCartItem[]>(() => {
    try {
      const parsed = JSON.parse(cartJson);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item) =>
            item &&
            typeof item.productId === 'string' &&
            typeof item.quantity === 'number' &&
            !isNaN(item.quantity) &&
            item.quantity > 0
        );
      }
    } catch {
      return [];
    }
    return [];
  }, [cartJson]);

  const saveRawItems = useCallback((items: RawCartItem[]) => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new Event(CART_EVENT));
    } catch {
      // Storage access or quota error
    }
  }, []);

  // Derive populated cart items from catalog (Single Source of Truth)
  const items = useMemo<PopulatedCartItem[]>(() => {
    const result: PopulatedCartItem[] = [];

    for (const raw of rawItems) {
      const product = getProductById(raw.productId);
      if (!product) continue;

      const safeQuantity = Math.max(1, Math.floor(raw.quantity) || 1);
      const unitPrice = product.salePrice ?? product.price;
      const lineSubtotal = unitPrice * safeQuantity;

      result.push({
        productId: raw.productId,
        product,
        quantity: safeQuantity,
        unitPrice,
        lineSubtotal,
      });
    }

    return result;
  }, [rawItems]);

  // Centralized calculations
  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.lineSubtotal, 0);
  }, [items]);

  const shippingNote = 'To be confirmed based on delivery area';

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const getItemQuantity = useCallback(
    (productId: string) => {
      const match = rawItems.find((item) => item.productId === productId);
      return match ? match.quantity : 0;
    },
    [rawItems]
  );

  const isInCart = useCallback(
    (productId: string) => {
      return getItemQuantity(productId) > 0;
    },
    [getItemQuantity]
  );

  const addItem = useCallback(
    (productId: string, quantity = 1) => {
      if (quantity <= 0) return;

      const product = getProductById(productId);
      if (!product) return;

      if (product.stockStatus === 'out_of_stock') {
        toast('This product is currently out of stock', 'error');
        return;
      }

      const current = [...rawItems];
      const existingIdx = current.findIndex((item) => item.productId === productId);
      if (existingIdx > -1) {
        current[existingIdx] = {
          ...current[existingIdx],
          quantity: current[existingIdx].quantity + quantity,
        };
      } else {
        current.push({ productId, quantity });
      }

      saveRawItems(current);

      const shortName =
        product.name.length > 28 ? product.name.substring(0, 28) + '...' : product.name;
      toast(`${shortName} added to cart`, 'success');
    },
    [rawItems, saveRawItems, toast]
  );

  const removeItem = useCallback(
    (productId: string) => {
      const updated = rawItems.filter((item) => item.productId !== productId);
      saveRawItems(updated);

      const product = getProductById(productId);
      const name = product ? product.name : 'Item';
      const shortName = name.length > 25 ? name.substring(0, 25) + '...' : name;
      toast(`${shortName} removed from cart`, 'info');
    },
    [rawItems, saveRawItems, toast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      const updated = rawItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, Math.floor(quantity)) }
          : item
      );
      saveRawItems(updated);
    },
    [rawItems, removeItem, saveRawItems]
  );

  const clearCart = useCallback(() => {
    saveRawItems([]);
    toast('Cart cleared', 'info');
  }, [saveRawItems, toast]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingNote,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
