export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  sku: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string; // Format: "NXB-YYYYMMDD-XXXX"
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: string; // "To be confirmed"
  total: string; // "To be confirmed"
  paymentMethod: string; // "To be confirmed personally"
  status: OrderStatus;
  notes?: string;
}
