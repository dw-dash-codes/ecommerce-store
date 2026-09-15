import React from 'react';
import { getWhatsAppLink, siteConfig } from '@/config/site';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'floating';
  label?: string;
  showIcon?: boolean;
}

export function WhatsAppButton({
  message,
  className = '',
  variant = 'primary',
  label = 'Chat on WhatsApp',
  showIcon = true,
}: WhatsAppButtonProps) {
  const href = getWhatsAppLink(message);

  if (variant === 'floating') {
    return (
      <aside
        aria-label="Direct WhatsApp Help"
        className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 print:hidden"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md border border-emerald-500 transition-colors"
          aria-label={`Chat with NexByte on WhatsApp at ${siteConfig.contact.whatsappDisplay}`}
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline font-medium">Chat on WhatsApp</span>
        </a>
      </aside>
    );
  }

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold text-xs rounded-md transition-colors cursor-pointer';

  let variantStyles = 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs px-4 py-2.5';

  if (variant === 'secondary') {
    variantStyles =
      'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-2.5';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-600 px-4 py-2.5';
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles} ${className}`}
      aria-label={`Chat on WhatsApp with NexByte`}
    >
      {showIcon && <MessageCircle className="w-4 h-4 fill-current" />}
      <span>{label}</span>
    </a>
  );
}
