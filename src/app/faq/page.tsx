'use client';

import React, { useState } from 'react';
import { faqs } from '@/data/faqs';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('faq-order-placement');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ordering', label: 'Ordering & Cancellation' },
    { id: 'payments', label: 'Payments & COD' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'warranty', label: 'Warranty & Returns' },
    { id: 'support', label: 'Contact & Support' },
  ];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Help & FAQs' }]} className="mb-2" />

      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Customer Support
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Find answers regarding our order placement, payment confirmation process, nationwide courier delivery across Pakistan, warranty support, and returns.
        </p>

        {/* Search inside FAQs */}
        <div className="mt-4 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. warranty, shipping, COD)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-xs sm:text-sm rounded-md pl-9 pr-3 py-2 border border-slate-300 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center rounded-md bg-white border border-slate-200 text-xs text-slate-500">
            No questions found matching your search. Please reach out to our support team on WhatsApp for immediate help.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-md bg-white border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p className="mt-1">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Contact Prompt Footer Card */}
      <div className="p-6 rounded-md bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Have a question that is not listed here?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Our Islamabad support desk is happy to help you with product recommendations, stock, or delivery queries.
          </p>
        </div>

        <WhatsAppButton
          message="Hi NexByte, I have a question not covered in the FAQs."
          label="Ask on WhatsApp"
        />
      </div>
    </div>
  );
}
