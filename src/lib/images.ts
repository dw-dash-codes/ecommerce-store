/**
 * Centralized Image Architecture
 *
 * All product and banner images follow a standardized path structure:
 *   - Products: `/images/products/[slug]-[index].jpg` (or .webp / .png)
 *   - Banners: `/images/banners/[banner-name].jpg`
 *
 * To replace placeholders with actual product photography:
 *   Place the real product photo in `/public/images/products/[slug]-1.jpg`
 */

export const DEFAULT_PRODUCT_IMAGE = '/images/products/placeholder.svg';

export function getProductImageUrl(imagePath?: string): string {
  if (!imagePath || imagePath.trim() === '') {
    return DEFAULT_PRODUCT_IMAGE;
  }
  return imagePath;
}

export function getProductGalleryImages(images?: string[]): string[] {
  if (!images || images.length === 0) {
    return [DEFAULT_PRODUCT_IMAGE];
  }
  return images.map(getProductImageUrl);
}

export interface HeroBannerSlide {
  id: string;
  image: string;
  headline: string;
  supportingText: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const HERO_BANNERS: HeroBannerSlide[] = [
  {
    id: 'banner-setup',
    image: '/images/banners/hero_setup_desk.jpg',
    headline: 'Upgrade Your Setup.',
    supportingText:
      'Discover gaming monitors, precision mice, mechanical keyboards, headsets, and computer accessories with nationwide courier delivery across Pakistan.',
    primaryCta: { label: 'Shop Now', href: '/shop' },
    secondaryCta: { label: 'Explore Categories', href: '/shop' },
  },
  {
    id: 'banner-peripherals',
    image: '/images/banners/hero_peripherals_gear.jpg',
    headline: 'Premium Gear. Better Performance.',
    supportingText:
      'Ultra-lightweight wireless mice, magnetic switch keyboards, and studio headsets from recognized global manufacturers.',
    primaryCta: { label: 'View Gaming Mice', href: '/shop/mice' },
    secondaryCta: { label: 'Browse Keyboards', href: '/shop/keyboards' },
  },
  {
    id: 'banner-displays',
    image: '/images/banners/hero_monitors_display.jpg',
    headline: 'High-Refresh Displays & Gear.',
    supportingText:
      'Fast IPS and QHD curved gaming monitors engineered for extreme clarity, smooth framerates, and reliable performance.',
    primaryCta: { label: 'Shop Monitors', href: '/shop/monitors' },
    secondaryCta: { label: 'View All Products', href: '/shop' },
  },
];
