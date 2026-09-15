import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/products';
import { ProductView } from '@/components/product/ProductView';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return { title: 'Product Not Found | NexByte Pakistan' };
  }

  const effectivePrice = product.salePrice ?? product.price;

  return {
    title: `${product.name} — ${product.brand} | NexByte Pakistan`,
    description: `${product.name} available in Pakistan at NexByte for Rs. ${effectivePrice.toLocaleString()}. ${product.shortDescription}`,
    openGraph: {
      title: `${product.name} — ${product.brand} | NexByte`,
      description: product.shortDescription,
      type: 'website',
      url: `https://nexbyte.pk/product/${product.slug}`,
      siteName: 'NexByte',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | NexByte`,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);
  const effectivePrice = product.salePrice ?? product.price;

  // Schema.org Structured Data (Product JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      price: effectivePrice,
      priceCurrency: 'PKR',
      availability:
        product.stockStatus === 'in_stock' || product.stockStatus === 'low_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `https://nexbyte.pk/product/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: 'NexByte',
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category, href: `/shop/${product.categoryId.replace('cat-', '')}` },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <ProductView product={product} relatedProducts={related} />
    </div>
  );
}
