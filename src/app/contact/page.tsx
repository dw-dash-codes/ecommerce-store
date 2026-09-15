'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { siteConfig } from '@/config/site';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Truck,
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Product Availability & Pricing',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; message?: string }>({});

  const validate = () => {
    const errors: { name?: string; phone?: string; message?: string } = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) errors.phone = 'Please provide your contact phone or WhatsApp number.';
    if (!formData.message.trim()) errors.message = 'Please type your inquiry or message.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate immediate, clean client response state
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        topic: 'Product Availability & Pricing',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} className="mb-2" />

      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
          Support & Inquiries
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact NexByte
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
          Have a question about product compatibility, stock status, delivery to your city, or an active order? Reach out to our Islamabad team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Details & WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Store Info Card */}
          <div className="p-5 sm:p-6 rounded-md bg-white border border-slate-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
              Direct Contact Information
            </h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Location</strong>
                  <span>{siteConfig.contact.locationText}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Order dispatch & nationwide fulfillment hub
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Phone & WhatsApp</strong>
                  <span className="font-mono text-slate-900 font-medium">
                    {siteConfig.contact.phoneDisplay}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Fastest response during operational hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Email Support</strong>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Official store and order communications
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Operating Hours</strong>
                  <span>{siteConfig.contact.businessHours}</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {siteConfig.contact.sundayStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <WhatsAppButton
                className="w-full"
                message="Hi NexByte, I am reaching out from your website contact page."
              />
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Nationwide Shipping Queries</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Shipping charges vary by city and parcel dimensions. If you have questions about delivery to your specific area, feel free to contact us with your city name.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 rounded-md bg-white border border-slate-200 shadow-xs">
            {formSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting NexByte. Our team in Islamabad will review your inquiry and get back to you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
                <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Send an Online Inquiry
                  </h2>
                  <span className="text-[11px] text-slate-400">* Required fields</span>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label htmlFor="contactName" className="block text-xs font-semibold text-slate-800">
                      Your Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      className={`w-full bg-white text-slate-900 rounded-md px-3 py-2 border ${
                        formErrors.name ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                      } focus:outline-none placeholder:text-slate-400`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contactPhone" className="block text-xs font-semibold text-slate-800">
                      Phone / WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      placeholder="03XX XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                      }}
                      className={`w-full bg-white text-slate-900 rounded-md px-3 py-2 border ${
                        formErrors.phone ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                      } focus:outline-none placeholder:text-slate-400 font-mono`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email & Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label htmlFor="contactEmail" className="block text-xs font-semibold text-slate-800">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white text-slate-900 rounded-md px-3 py-2 border border-slate-300 focus:border-blue-600 focus:outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contactTopic" className="block text-xs font-semibold text-slate-800">
                      Inquiry Topic
                    </label>
                    <select
                      id="contactTopic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-white text-slate-900 rounded-md px-3 py-2 border border-slate-300 focus:border-blue-600 focus:outline-none"
                    >
                      <option>Product Availability & Pricing</option>
                      <option>Shipping & Delivery Confirmation</option>
                      <option>Technical Specs & Compatibility</option>
                      <option>Warranty & Support Inquiry</option>
                      <option>Other Question</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="contactMessage" className="block text-xs font-semibold text-slate-800">
                    Message / Question <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    placeholder="Describe how we can help you with products or delivery..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                    }}
                    className={`w-full bg-white text-slate-900 rounded-md px-3 py-2 border ${
                      formErrors.message ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                    } focus:outline-none placeholder:text-slate-400`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-red-600">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                  </button>

                  <span className="text-[11px] text-slate-400">
                    We usually respond within a few hours.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
