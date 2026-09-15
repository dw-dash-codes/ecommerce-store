/**
 * Centralized Store & Contact Configuration for NexByte
 * Update store details, phone numbers, and WhatsApp contact in this single file.
 */

export const siteConfig = {
  name: 'NexByte',
  tagline: 'Online Computer Accessories & Gaming Peripherals Store',
  description:
    'Pakistan-based online computer accessories store in Islamabad, delivering gaming monitors, mice, mechanical keyboards, headsets, and desk gear nationwide.',
  
  // Feature Flags (Easily toggle features store-wide)
  features: {
    // When false, products display their current clean price without crossed-out original prices or sale badges
    showDiscounts: false,
    // When false, promotional badges (Best Seller, Sale, Stock tags) on product cards are visually hidden
    showProductCardBadges: false,
  },

  // Contact & Location Details
  contact: {
    city: 'Islamabad',
    country: 'Pakistan',
    locationText: 'Islamabad, Pakistan',
    phoneDisplay: '+92 300 6392983',
    phoneRaw: '+923006392983',
    whatsappDigits: '923006392983',
    whatsappDisplay: '+92 300 6392983',
    email: 'support@nexbyte.pk',
    ordersEmail: 'orders@nexbyte.pk',
    businessHours: 'Monday – Saturday: 11:00 AM – 9:00 PM (PKT)',
    sundayStatus: 'Sunday: Closed (Online orders & inquiries accepted)',
  },

  // Nationwide Delivery Details
  shipping: {
    coverage: 'Nationwide across Pakistan (All major cities and rural districts)',
    couriers: 'TCS, Leopards Courier, Trax, PostEx & Local Twin Cities Dispatch',
    timelineMajorCities: '1 – 3 business days',
    timelineNationwide: '2 – 5 business days',
    costPolicy: 'Calculated and confirmed personally with each customer based on destination and parcel volumetric weight',
  },

  // Featured Brands & Product Categories
  catalog: {
    brands: ['Logitech', 'Attack Shark', 'ATK', 'MSI', 'HyperX', 'AOC'],
    categories: [
      { name: 'Monitors', slug: 'monitors', desc: 'Fast IPS, QHD, and high-refresh gaming monitors' },
      { name: 'Gaming Mice', slug: 'mice', desc: 'Ultra-lightweight wireless and competitive sensors' },
      { name: 'Keyboards', slug: 'keyboards', desc: 'Mechanical, magnetic switch, and hot-swappable boards' },
      { name: 'Headsets / Headphones', slug: 'headsets', desc: 'Surround sound gaming audio and low-latency wireless' },
      { name: 'Computer Accessories', slug: 'accessories', desc: 'Glass mousepads, monitor arms, lights, and PTFE skates' },
    ],
  },

  // Store Policies Summary
  policies: {
    paymentMethods: [
      'Cash on Delivery (COD)',
      'Raast Instant Payment',
      'Direct Bank Transfer (Meezan Bank, HBL, Bank Alfalah)',
      'JazzCash / EasyPaisa',
    ],
    warrantySummary: 'Official manufacturer warranty or store replacement warranty stated directly on every product page.',
  },
};

/**
 * Generate a pre-filled direct WhatsApp link
 */
export function getWhatsAppLink(message?: string): string {
  const defaultMsg = 'Hi NexByte, I have an inquiry about your products.';
  const encoded = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${siteConfig.contact.whatsappDigits}?text=${encoded}`;
}
