export type PakistaniProvince =
  | 'Islamabad Capital Territory'
  | 'Punjab'
  | 'Sindh'
  | 'Khyber Pakhtunkhwa'
  | 'Balochistan'
  | 'Gilgit-Baltistan'
  | 'Azad Jammu & Kashmir';

export interface ShippingAddress {
  fullName: string;
  phone: string; // e.g., "0300 1234567"
  email: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  province: PakistaniProvince;
  postalCode?: string;
  deliveryInstructions?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  defaultAddress?: ShippingAddress;
  createdAt: string;
}
