/**
 * Formats a number to Pakistani Rupee currency string (e.g., PKR 44,900 or Rs. 44,900)
 */
export function formatPKR(amount: number, prefix: 'PKR' | 'Rs.' = 'PKR'): string {
  if (isNaN(amount)) return `${prefix} 0`;
  const formatted = new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${prefix} ${formatted}`;
}

/**
 * Calculates percentage savings between regular and sale price
 */
export function calculateDiscountPercentage(originalPrice: number, salePrice?: number): number {
  if (!salePrice || salePrice >= originalPrice || originalPrice <= 0) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Formats a standard ISO date string to a human readable format
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
