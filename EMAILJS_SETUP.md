# EmailJS Configuration Guide for NexByte

This guide explains how to configure and connect EmailJS to NexByte for automated order processing without requiring a backend server.

---

## 1. Create an EmailJS Account

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2. Confirm your email address and log in to the dashboard.

---

## 2. Connect an Email Service

1. Navigate to **Email Services** in the left sidebar.
2. Click **Add New Service**.
3. Choose your preferred email provider:
   - **Gmail** (Recommended for quick setup)
   - **Outlook / Office 365**
   - **Custom SMTP**
4. Complete the authorization steps with your store's email address (e.g., `orders@nexbyte.pk` or `nexbyte.pk@gmail.com`).
5. Copy your **Service ID** (e.g., `service_abc1234`).

---

## 3. Create the Admin Order Notification Template

1. Navigate to **Email Templates** &rarr; **Create New Template**.
2. Set the **Template Name**: `NexByte Admin Order Notification`.
3. Set the **Subject Line**:
   ```
   NexByte — New Order {{order_id}}
   ```
4. Set the **To Email**: `{{customer_email}}` or leave empty to default to your connected service email address.
5. Set the **Reply-To**: `{{customer_email}}`.
6. Paste the following template into the email body:

### Admin Email Body (Text / HTML):

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; line-height: 1.5;">
  <div style="background-color: #0f172a; padding: 18px 24px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">NEXBYTE — NEW ORDER</h1>
  </div>

  <div style="padding: 24px; background-color: #ffffff; border: 1px solid #e2e8f0;">
    <p style="font-size: 14px; margin-top: 0;">
      A new customer order has been submitted on the NexByte store.
    </p>

    <table style="width: 100%; font-size: 13px; margin-bottom: 20px; border-collapse: collapse;">
      <tr>
        <td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>Order ID:</strong></td>
        <td style="padding: 6px 0; font-weight: bold; font-family: monospace; color: #1e3a8a;">{{order_id}}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b;"><strong>Order Date:</strong></td>
        <td style="padding: 6px 0;">{{order_date}}</td>
      </tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">
      Customer & Delivery Details
    </h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 20px; border-collapse: collapse;">
      <tr>
        <td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
        <td style="padding: 6px 0; font-weight: bold;">{{customer_name}}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td>
        <td style="padding: 6px 0;"><a href="tel:{{customer_phone}}" style="color: #2563eb;">{{customer_phone}}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
        <td style="padding: 6px 0;"><a href="mailto:{{customer_email}}" style="color: #2563eb;">{{customer_email}}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b;"><strong>City:</strong></td>
        <td style="padding: 6px 0; font-weight: bold;">{{customer_city}}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b;"><strong>Address:</strong></td>
        <td style="padding: 6px 0;">{{customer_address}}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b;"><strong>Order Notes:</strong></td>
        <td style="padding: 6px 0; font-style: italic; color: #475569;">{{order_notes}}</td>
      </tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">
      Order Items
    </h3>
    
    <div style="background-color: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 12px; white-space: pre-wrap; margin-bottom: 16px;">
{{order_items}}
    </div>

    <table style="width: 100%; font-size: 13px; border-top: 2px solid #cbd5e1; padding-top: 10px; margin-top: 16px;">
      <tr>
        <td style="padding: 4px 0; color: #64748b;"><strong>Subtotal:</strong></td>
        <td style="padding: 4px 0; text-align: right; font-weight: bold;">{{subtotal}}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #64748b;"><strong>Shipping:</strong></td>
        <td style="padding: 4px 0; text-align: right; color: #64748b; font-style: italic;">{{shipping}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-size: 15px; font-weight: bold; color: #0f172a;"><strong>Total:</strong></td>
        <td style="padding: 8px 0; text-align: right; font-size: 15px; font-weight: bold; color: #0f172a;">{{total}}</td>
      </tr>
    </table>

    <div style="margin-top: 20px; padding: 12px; background-color: #eff6ff; border-left: 4px solid #2563eb; font-size: 12px; color: #1e40af;">
      <strong>Next Step:</strong> Contact the customer at <a href="https://wa.me/{{customer_phone}}" style="color: #2563eb; font-weight: bold;">{{customer_phone}}</a> to confirm shipping charges for {{customer_city}} and arrange payment details.
    </div>
  </div>
</div>
```

7. Save the template and copy your **Template ID** (e.g., `template_admin_order`).

---

## 4. (Optional) Create the Customer Acknowledgement Template

1. Create a second template named `NexByte Customer Acknowledgement`.
2. Set **To Email**: `{{customer_email}}`.
3. Set **Subject Line**:
   ```
   NexByte Order Received — {{order_id}}
   ```
4. Paste the customer email body:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; line-height: 1.6;">
  <div style="background-color: #0f172a; padding: 18px 24px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">NexByte</h1>
  </div>

  <div style="padding: 24px; background-color: #ffffff; border: 1px solid #e2e8f0;">
    <p style="font-size: 14px;">Hello <strong>{{customer_name}}</strong>,</p>

    <p style="font-size: 13px; color: #334155;">
      Thank you for shopping with NexByte. We have successfully received your order request.
    </p>

    <div style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; margin: 16px 0;">
      <span style="font-size: 12px; color: #64748b;">Order Number:</span><br/>
      <strong style="font-size: 16px; font-family: monospace; color: #1e3a8a;">{{order_id}}</strong>
    </div>

    <h3 style="font-size: 13px; text-transform: uppercase; color: #1e3a8a; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 20px;">
      Order Summary
    </h3>
    
    <div style="background-color: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 12px; white-space: pre-wrap; margin-bottom: 12px;">
{{order_items}}
    </div>

    <table style="width: 100%; font-size: 13px; margin-top: 10px;">
      <tr>
        <td style="color: #64748b;">Subtotal:</td>
        <td style="text-align: right; font-weight: bold;">{{subtotal}}</td>
      </tr>
      <tr>
        <td style="color: #64748b;">Shipping:</td>
        <td style="text-align: right; color: #64748b; font-style: italic;">To be confirmed based on delivery area</td>
      </tr>
      <tr>
        <td style="color: #64748b;">Payment:</td>
        <td style="text-align: right; color: #64748b; font-style: italic;">To be confirmed personally</td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding: 14px; background-color: #eff6ff; border-radius: 4px; font-size: 12px; color: #1e40af;">
      <strong>What's Next?</strong><br/>
      Our team in Islamabad will contact you personally via WhatsApp / phone to confirm the courier delivery charges for {{customer_city}} and arrange your preferred payment method (Cash on Delivery, Raast, or Direct Bank Transfer).
    </div>

    <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
      If you have any questions, you can reach us directly on WhatsApp at <a href="https://wa.me/923006392983" style="color: #2563eb; font-weight: bold;">+92 300 6392983</a>.
    </p>

    <p style="font-size: 12px; color: #334155; margin-top: 16px;">
      Thank you for choosing NexByte.<br/>
      <strong>NexByte Team</strong><br/>
      Islamabad, Pakistan
    </p>
  </div>
</div>
```

5. Copy the **Customer Template ID** (e.g., `template_customer_ack`).

---

## 5. Get Your Public Key

1. In EmailJS, go to **Account** &rarr; **API Keys**.
2. Copy your **Public Key** (e.g., `pKey_xxxxxxxxxxxxxxxxx`).

---

## 6. Configure Environment Variables

Create or open the `.env` file in the project root:

```env
# NexByte EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_admin_xxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx

# Optional customer template
NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer_xxxx
```

> **Note**: In development mode (`NODE_ENV === 'development'`), if environment variables are not yet configured, the system simulates successful order submission and logs a reminder to the browser console.

---

## 7. Restart Development Server

After adding your keys to `.env`, restart your Next.js dev server:

```bash
npm run dev
```

---

## 8. Template Variables Reference

The following parameters are automatically populated by [`src/lib/emailjs.ts`](file:///c:/NexByte%20Website/src/lib/emailjs.ts):

| Parameter | Type | Example Value |
| :--- | :--- | :--- |
| `order_id` | String | `NXB-20260915-4821` |
| `order_date` | String | `Sep 15, 2026, 07:30 PM` |
| `customer_name` | String | `Muhammad Ahmed` |
| `customer_phone` | String | `0300 1234567` |
| `customer_email` | String | `ahmed@example.com` |
| `customer_address` | String | `House 42, Street 8, Sector F-7/2` |
| `customer_city` | String | `Islamabad` |
| `order_items` | String | Formatted text representation of all cart items |
| `order_items_html` | String | HTML table representation of all cart items |
| `subtotal` | String | `Rs. 46,500` |
| `shipping` | String | `To be confirmed based on delivery area` |
| `total` | String | `To be confirmed` |
| `order_notes` | String | `Deliver after 3 PM please` |
| `payment_info` | String | `Payment details will be confirmed personally...` |
| `store_name` | String | `NexByte` |
| `store_location` | String | `Islamabad, Pakistan` |
| `store_phone` | String | `+92 300 6392983` |
| `store_whatsapp` | String | `+92 300 6392983` |
