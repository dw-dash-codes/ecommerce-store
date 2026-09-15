import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getAllCategories } from '@/lib/products';
import { products } from '@/data/products';
import { CategoryShopView } from '@/components/shop/CategoryShopView';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const allCategories = getAllCategories();
  const slugs = new Set<string>();
  for (const c of allCategories) {
    slugs.add(c.slug);
  }
  // Include backward compatibility alias
  slugs.add('gaming-mice');
  slugs.add('mice');

  return Array.from(slugs).map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    return { title: 'Category Not Found | NexByte' };
  }

  return {
    title: `${category.name} | NexByte Pakistan`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (p) =>
      p.categoryId === category.id ||
      p.category.toLowerCase() === category.name.toLowerCase() ||
      (category.slug === 'mice' && (p.categoryId === 'cat-mice' || p.categoryId === 'cat-gaming-mice'))
  );

  return (
    <CategoryShopView
      category={category}
      initialProducts={categoryProducts}
    />
  );
}
