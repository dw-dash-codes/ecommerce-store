import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | NexByte Pakistan',
    default: 'NexByte — Computer Accessories & Gaming Peripherals in Pakistan',
  },
  description:
    'Pakistan-based online computer accessories store in Islamabad. Shop authentic gaming monitors, mechanical keyboards, precision mice, headsets, and desk gear with nationwide courier delivery.',
  keywords: [
    'computer accessories Pakistan',
    'gaming mice Pakistan',
    'mechanical keyboards Pakistan',
    'gaming monitors Pakistan',
    'computer hardware Islamabad',
    'NexByte store',
  ],
  metadataBase: new URL('https://nexbyte.pk'),
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://nexbyte.pk',
    title: 'NexByte — Computer Accessories & Gaming Peripherals in Pakistan',
    description:
      'Pakistan-based online computer accessories store in Islamabad. Shop authentic gaming monitors, mechanical keyboards, precision mice, headsets, and desk accessories with nationwide delivery.',
    siteName: 'NexByte',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexByte — Computer Accessories & Gaming Peripherals in Pakistan',
    description:
      'Pakistan-based online computer accessories store in Islamabad. Shop authentic gaming monitors, mechanical keyboards, precision mice, and headsets with nationwide delivery.',
  },
};

export const viewport: Viewport = {
  themeColor: '#1e3a8a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 pb-16 lg:pb-0">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileNav />
              <CartDrawer />
              <WhatsAppButton variant="floating" />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
