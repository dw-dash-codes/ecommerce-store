import { Order, OrderCustomer, OrderItem } from '@/types/order';
import { getProductById } from '@/lib/products';
import { RawCartItem } from '@/context/CartContext';

/**
 * Generate human-readable unique order reference in format:
 * NXB-YYYYMMDD-XXXX (e.g. NXB-20260915-4821)
 */
export function generateOrderId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateSegment = `${year}${month}${day}`;

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomSegment = '';
  for (let i = 0; i < 4; i++) {
    randomSegment += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `NXB-${dateSegment}-${randomSegment}`;
}

/**
 * Validates Pakistani phone number formats:
 * 03XXXXXXXXX (11 digits), +923XXXXXXXXX, 00923XXXXXXXXX, with or without spaces/dashes.
 */
export function validatePakistaniPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Matches 03001234567, +923001234567, 923001234567, 00923001234567
  const phoneRegex = /^(?:\+92|0092|92|0)?3[0-9]{9}$/;
  return phoneRegex.test(cleaned);
}

/**
 * Validates standard email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export const PAKISTAN_MAJOR_CITIES = [
  'Islamabad',
  'Rawalpindi',
  'Lahore',
  'Karachi',
  'Faisalabad',
  'Peshawar',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Quetta',
  'Hyderabad',
  'Abbottabad',
  'Bahawalpur',
  'Sargodha',
  'Other',
];

export interface OrderVerificationResult {
  order: Order | null;
  error?: string;
  errorType?: 'EMPTY_CART' | 'PRODUCT_NOT_FOUND' | 'OUT_OF_STOCK' | 'INVALID_DATA';
}

/**
 * Construct verified Order object using catalog data as source of truth.
 * Recalculates unit prices, line totals, and subtotal directly from catalog.
 * Validates availability and returns explicit error if any item is invalid or out of stock.
 */
export function verifyAndCreateOrder(
  customer: OrderCustomer,
  rawItems: RawCartItem[],
  notes?: string
): OrderVerificationResult {
  if (!rawItems || rawItems.length === 0) {
    return {
      order: null,
      error: 'Your cart is empty. Please add products before placing an order.',
      errorType: 'EMPTY_CART',
    };
  }

  const verifiedItems: OrderItem[] = [];
  let calculatedSubtotal = 0;

  for (const raw of rawItems) {
    const product = getProductById(raw.productId);
    if (!product) {
      return {
        order: null,
        error: 'One or more items in your cart are no longer available in the catalog.',
        errorType: 'PRODUCT_NOT_FOUND',
      };
    }

    if (product.stockStatus === 'out_of_stock') {
      return {
        order: null,
        error: `"${product.name}" is currently out of stock. Please remove it from your cart to proceed.`,
        errorType: 'OUT_OF_STOCK',
      };
    }

    const safeQty = Math.max(1, Math.floor(raw.quantity) || 1);
    const unitPrice = product.salePrice ?? product.price;

    if (isNaN(unitPrice) || unitPrice <= 0) {
      return {
        order: null,
        error: `Invalid pricing encountered for "${product.name}".`,
        errorType: 'INVALID_DATA',
      };
    }

    const lineTotal = unitPrice * safeQty;
    calculatedSubtotal += lineTotal;

    verifiedItems.push({
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      sku: product.sku,
      thumbnail: product.thumbnail || product.images?.[0] || '',
      quantity: safeQty,
      unitPrice,
      lineTotal,
    });
  }

  if (verifiedItems.length === 0) {
    return {
      order: null,
      error: 'No valid products could be verified in your cart.',
      errorType: 'EMPTY_CART',
    };
  }

  const newOrder: Order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email.trim().toLowerCase(),
      address: customer.address.trim(),
      city: customer.city.trim(),
    },
    items: verifiedItems,
    subtotal: calculatedSubtotal,
    shipping: 'To be confirmed based on delivery area',
    total: 'To be confirmed',
    paymentMethod: 'To be confirmed personally',
    status: 'pending',
    notes: notes?.trim() || undefined,
  };

  return {
    order: newOrder,
  };
}

/**
 * Backward compatibility helper
 */
export function createOrderFromCart(
  customer: OrderCustomer,
  rawItems: RawCartItem[],
  notes?: string
): Order | null {
  const result = verifyAndCreateOrder(customer, rawItems, notes);
  return result.order;
}
