'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HERO_BANNERS, HeroBannerSlide } from '@/lib/images';

export interface HeroBannerProps {
  slides?: HeroBannerSlide[];
}

export function HeroBanner({ slides = HERO_BANNERS }: HeroBannerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, totalSlides]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const current = slides[currentIdx];

  return (
    <div className="border-b border-slate-200">
      {/* Main Banner Visual Container */}
      <div
        className="relative bg-slate-900 text-white overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Images for all slides (preloaded for smooth seamless transitions) */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIdx ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority={idx === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* High-contrast solid scrim overlay to guarantee sharp text readability */}
            <div className="absolute inset-0 bg-slate-950/75" />
          </div>
        ))}

        {/* Hero Content Stage */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {current.headline}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              {current.supportingText}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href={current.primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
              >
                <span>{current.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={current.secondaryCta.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm transition-colors cursor-pointer"
              >
                <span>{current.secondaryCta.label}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Slide Navigation Controls */}
        {totalSlides > 1 && (
          <>
            {/* Arrow Buttons */}
            <div className="hidden sm:flex absolute right-4 bottom-4 z-20 items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous banner slide"
                className="p-2 rounded bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next banner slide"
                className="p-2 rounded bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center gap-2 sm:hidden">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIdx ? 'w-6 bg-blue-500' : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Service Highlights Strip */}
      <div className="bg-slate-50 border-t border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-medium">Nationwide Courier Delivery Across Pakistan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Warranty Specified on Product Pages</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
              <span className="font-medium">Cash on Delivery & Raast Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
