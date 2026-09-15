import emailjs from '@emailjs/browser';
import { Order } from '@/types/order';
import { formatPKR } from '@/lib/formatters';

export interface EmailJSConfig {
  serviceId: string;
  adminTemplateId: string;
  customerTemplateId?: string;
  publicKey: string;
}

export interface EmailJSTemplateParams extends Record<string, unknown> {
  order_id: string;
  order_date: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  order_items: string;
  order_items_html?: string;
  subtotal: string;
  shipping: string;
  total: string;
  order_notes: string;
  payment_info: string;
  store_name: string;
  store_location: string;
  store_phone: string;
  store_whatsapp: string;
}

export interface EmailSendResult {
  success: boolean;
  adminEmailSent: boolean;
  customerEmailSent: boolean;
  error?: string;
  developerNotice?: string;
}

/**
 * Retrieve and validate EmailJS environment configuration
 */
export function getEmailJSConfig(): EmailJSConfig | null {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const adminTemplateId = (
    process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID ||
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  )?.trim();
  const customerTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID?.trim();
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !adminTemplateId || !publicKey) {
    return null;
  }

  return {
    serviceId,
    adminTemplateId,
    customerTemplateId: customerTemplateId || undefined,
    publicKey,
  };
}

/**
 * Check if EmailJS credentials are configured in environment variables
 */
export function isEmailJSConfigured(): boolean {
  return getEmailJSConfig() !== null;
}

/**
 * Format order items into a clean, human-readable text block for email templates
 */
export function formatOrderItemsText(order: Order): string {
  return order.items
    .map((item, index) => {
      const line1 = `${index + 1}. ${item.brand ? `[${item.brand}] ` : ''}${item.productName}`;
      const line2 = `   Qty: ${item.quantity}`;
      const line3 = `   Unit Price: ${formatPKR(item.unitPrice)}`;
      const line4 = `   Subtotal: ${formatPKR(item.lineTotal)}`;
      return `${line1}\n${line2}\n${line3}\n${line4}`;
    })
    .join('\n\n');
}

/**
 * Format order items into a clean HTML table for HTML-enabled email templates
 */
export function formatOrderItemsHtml(order: Order): string {
  const rows = order.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 8px; font-size: 13px; color: #0f172a;">
          <strong>${item.productName}</strong><br/>
          <span style="font-size: 11px; color: #64748b;">SKU: ${item.sku} &bull; ${item.brand}</span>
        </td>
        <td style="padding: 10px 8px; font-size: 13px; color: #0f172a; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 10px 8px; font-size: 13px; color: #0f172a; text-align: right; font-family: monospace;">
          ${formatPKR(item.unitPrice)}
        </td>
        <td style="padding: 10px 8px; font-size: 13px; font-weight: bold; color: #0f172a; text-align: right; font-family: monospace;">
          ${formatPKR(item.lineTotal)}
        </td>
      </tr>
    `
    )
    .join('');

  return `
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 10px;">
      <thead>
        <tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1; text-align: left;">
          <th style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #475569;">Product</th>
          <th style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #475569; text-align: center;">Qty</th>
          <th style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #475569; text-align: right;">Unit Price</th>
          <th style="padding: 8px; font-size: 11px; text-transform: uppercase; color: #475569; text-align: right;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

/**
 * Build parameters matching the standard EmailJS templates
 */
export function buildEmailJSTemplateParams(order: Order): EmailJSTemplateParams {
  const formattedDate = new Date(order.createdAt).toLocaleString('en-PK', {
    timeZone: 'Asia/Karachi',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    order_id: order.id,
    order_date: formattedDate,
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    customer_email: order.customer.email,
    customer_address: order.customer.address,
    customer_city: order.customer.city,
    order_items: formatOrderItemsText(order),
    order_items_html: formatOrderItemsHtml(order),
    subtotal: formatPKR(order.subtotal),
    shipping: order.shipping,
    total: order.total,
    order_notes: order.notes || 'None provided',
    payment_info: 'Payment details will be confirmed personally with the customer (COD / Raast / Bank Transfer).',
    store_name: 'NexByte',
    store_location: 'Islamabad, Pakistan',
    store_phone: '+92 300 6392983',
    store_whatsapp: '+92 300 6392983',
  };
}

/**
 * Dispatch order emails via EmailJS
 * 1. Admin order notification
 * 2. Customer acknowledgement (if template configured)
 */
export async function sendOrderEmails(order: Order): Promise<EmailSendResult> {
  const config = getEmailJSConfig();

  // If EmailJS is not configured in local development / production:
  if (!config) {
    if (process.env.NODE_ENV === 'development') {
      // In local development, log the simulated email payload and allow developer testing
      console.warn(
        '[EmailJS Development Notice]: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, or NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not configured in .env.local.\n' +
        'Simulating successful order submission in development mode. See EMAILJS_SETUP.md to connect your real EmailJS account.'
      );
      return {
        success: true,
        adminEmailSent: false,
        customerEmailSent: false,
        developerNotice: 'EmailJS keys not detected in .env.local — Order simulated successfully in development mode.',
      };
    }

    // In production without env vars:
    return {
      success: false,
      adminEmailSent: false,
      customerEmailSent: false,
      error: 'Order submission service is currently undergoing scheduled maintenance. Please contact us directly via WhatsApp to place your order.',
    };
  }

  const templateParams = buildEmailJSTemplateParams(order);
  let adminSent = false;
  let customerSent = false;

  try {
    // 1. Send Admin Order Notification
    const adminResponse = await emailjs.send(
      config.serviceId,
      config.adminTemplateId,
      templateParams,
      {
        publicKey: config.publicKey,
      }
    );

    if (adminResponse.status === 200 || adminResponse.text === 'OK') {
      adminSent = true;
    } else {
      throw new Error(`EmailJS responded with status: ${adminResponse.status}`);
    }

    // 2. Send Customer Acknowledgement if template is configured
    if (config.customerTemplateId) {
      try {
        const customerResponse = await emailjs.send(
          config.serviceId,
          config.customerTemplateId,
          templateParams,
          {
            publicKey: config.publicKey,
          }
        );
        if (customerResponse.status === 200 || customerResponse.text === 'OK') {
          customerSent = true;
        }
      } catch (custErr) {
        // Non-fatal: admin email was successfully received
        if (process.env.NODE_ENV === 'development') {
          console.warn('[EmailJS Customer Template Warning]: Failed to send customer copy:', custErr);
        }
      }
    }

    return {
      success: true,
      adminEmailSent: adminSent,
      customerEmailSent: customerSent,
    };
  } catch (err: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[EmailJS Send Error]:', err);
    }

    return {
      success: false,
      adminEmailSent: false,
      customerEmailSent: false,
      error: "We couldn't submit your order right now. Please try again or reach out to our team on WhatsApp.",
    };
  }
}
