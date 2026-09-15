import { Product } from './product';

export interface CartItem {
  id: string; // unique cart item id (e.g. productId or product+variant)
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number; // PKR
  shippingFee: number; // PKR
  discount: number; // PKR
  total: number; // PKR
  isOpen: boolean; // Cart drawer toggle
}
