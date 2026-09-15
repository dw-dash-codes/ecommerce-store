import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  href?: string;
}

export function Logo({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  href = '/',
}: LogoProps) {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-7.5 h-7.5 sm:w-8 sm:h-8 text-xs sm:text-sm',
    lg: 'w-9 h-9 text-base',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Badge */}
      <div
        className={`${iconSizes[size]} rounded bg-slate-900 flex items-center justify-center font-black tracking-tight shrink-0 border ${
          isLight ? 'bg-slate-900 text-white border-slate-700' : 'bg-slate-900 text-white border-slate-900'
        }`}
      >
        <span className="font-mono text-white">N</span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-600 ml-0.5" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center">
          <span
            className={`${textSizes[size]} font-black tracking-tight ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            NEX
          </span>
          <span className={`${textSizes[size]} font-black tracking-tight text-blue-600`}>
            BYTE
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[8.5px] font-bold uppercase tracking-widest mt-0.5 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Pakistan Store
          </span>
        )}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex items-center group cursor-pointer" aria-label="NexByte Pakistan Home">
      {content}
    </Link>
  );
}
