export interface FAQItem {
  id: string;
  category: 'ordering' | 'payments' | 'shipping' | 'warranty' | 'support';
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-order-placement',
    category: 'ordering',
    question: 'How do I place an order on NexByte?',
    answer:
      'Placing an order is simple: browse our catalog, select your desired products, and add them to your cart. Proceed to the checkout page, enter your delivery address, city, and Pakistani phone number, then click "Place Order". You will immediately receive a unique Order ID (e.g. NXB-20260915-XXXX). No upfront online card payment is required at checkout.',
  },
  {
    id: 'faq-payment-process',
    category: 'payments',
    question: 'How does the payment process work?',
    answer:
      'After you submit your order, a NexByte representative will contact you directly via WhatsApp or phone call to confirm exact shipping charges for your city and discuss your preferred payment method. Accepted payment options include Cash on Delivery (COD), Raast Instant Pay, Direct Bank Transfer (Meezan Bank / HBL), and JazzCash / EasyPaisa.',
  },
  {
    id: 'faq-shipping-coverage',
    category: 'shipping',
    question: 'Do you deliver across all of Pakistan?',
    answer:
      'Yes, NexByte delivers nationwide across all provinces and territories in Pakistan (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad Capital Territory, Azad Kashmir, and Gilgit-Baltistan) through trusted domestic courier services such as TCS, Leopards Courier, and Trax.',
  },
  {
    id: 'faq-shipping-charges',
    category: 'shipping',
    question: 'How are shipping charges calculated?',
    answer:
      'Shipping rates depend on your destination city, parcel volumetric size, and weight (especially for large items like monitors). Rather than charging an arbitrary fee, our team calculates the exact courier rate for your city and confirms it with you before dispatching your package.',
  },
  {
    id: 'faq-delivery-time',
    category: 'shipping',
    question: 'How long does delivery take?',
    answer:
      'Deliveries within Islamabad and Rawalpindi typically take 1 to 2 business days. Major metropolitan cities (Lahore, Karachi, Peshawar, Faisalabad, Multan, Sialkot, Gujranwala) take 2 to 3 business days. Other nationwide locations take 3 to 5 business days from the time your order is confirmed.',
  },
  {
    id: 'faq-product-warranty',
    category: 'warranty',
    question: 'Do your products come with a warranty?',
    answer:
      'Yes. Every product listing on NexByte clearly states its specific warranty terms—ranging from official manufacturer warranties (1 to 3 years on brands like AOC, MSI, Logitech, and HyperX) to store replacement warranties on select accessories. Warranty coverage covers hardware manufacturing defects.',
  },
  {
    id: 'faq-returns-exchanges',
    category: 'warranty',
    question: 'What is your return and exchange policy?',
    answer:
      'If your item arrives damaged in transit or is functionally defective upon unboxing, notify us within 7 days of delivery with your Order ID and photos or an unboxing video. Once verified, we will arrange a replacement or resolve the issue promptly in accordance with our Return Policy.',
  },
  {
    id: 'faq-order-cancellation',
    category: 'ordering',
    question: 'Can I cancel or modify my order?',
    answer:
      'Yes. You may modify or cancel your order at any time before it has been handed over to the courier for dispatch. Simply reply to our WhatsApp confirmation message or message our team with your Order ID.',
  },
  {
    id: 'faq-product-availability',
    category: 'ordering',
    question: 'Are all products displayed on the store in stock?',
    answer:
      'We maintain active stock tracking. Products marked "In Stock" or "Low Stock" are available for immediate dispatch. If a product is marked "Out of Stock", you can contact us on WhatsApp to inquire about restock dates or pre-order availability.',
  },
  {
    id: 'faq-contact-methods',
    category: 'support',
    question: 'How can I contact NexByte for help or product advice?',
    answer:
      'You can reach our Islamabad support desk directly via WhatsApp / phone at +92 300 6392983, by email at support@nexbyte.pk, or by submitting an inquiry via our Contact page. We are available Monday through Saturday from 11:00 AM to 9:00 PM.',
  },
];
