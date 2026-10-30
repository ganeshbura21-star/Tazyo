import { CartItem, OrderDetails } from '../types';

export const TAZYO_PHONE = '918451887785';
export const FREE_DELIVERY_THRESHOLD = 299;
export const STANDARD_DELIVERY_FEE = 30;

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateDeliveryFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
}

export function calculateTotal(subtotal: number, deliveryFee: number): number {
  return subtotal + deliveryFee;
}

/**
 * Builds a beautifully formatted, structured WhatsApp message string for an order.
 */
export function formatWhatsAppOrderMessage(
  cartItems: CartItem[],
  details: OrderDetails,
  deliveryOtp?: string
): string {
  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = calculateTotal(subtotal, deliveryFee);

  const header = `🥬 *NEW TAZYO DELIVERY ORDER* 🥕\n_Vegetable Fruit • Fresh Wash • Hygienic • Cut to Ready to Cook_\n----------------------------------------`;

  const customerInfo = `👤 *Customer Details:*
• Name: ${details.customerName.trim()}
• Phone: ${details.phone.trim()}
• Address: ${details.address.trim()}${details.landmark ? `\n• Landmark: ${details.landmark.trim()}` : ''}
• Preferred Slot: ${details.deliverySlot}
• Payment Mode: ${details.paymentMethod}`;

  const otpSection = deliveryOtp
    ? `🔐 *Doorstep Delivery OTP:* [ ${deliveryOtp} ]\n_(Customer will verify this code with the delivery partner upon handover)_`
    : '';

  const itemsList = cartItems
    .map((item, index) => {
      const cutText = item.selectedCut ? ` [${item.selectedCut}]` : '';
      const notesText = item.notes ? ` (Note: ${item.notes.trim()})` : '';
      const linePrice = item.product.price * item.quantity;
      return `${index + 1}. *${item.product.name}* (${item.product.unit}) x ${item.quantity}${cutText} = ₹${linePrice}${notesText}`;
    })
    .join('\n');

  const itemsSection = `🛒 *Order Items (${cartItems.length}):*\n${itemsList}`;

  const summarySection = `💰 *Bill Summary:*
• Subtotal: ₹${subtotal}
• Delivery: ${deliveryFee === 0 ? 'FREE (Orders above ₹299)' : `₹${deliveryFee}`}
• *Estimated Total: ₹${total}*`;

  const instructions = details.specialNotes?.trim()
    ? `\n📝 *Special Prep / Delivery Instructions:*\n"${details.specialNotes.trim()}"`
    : '';

  const footer = `----------------------------------------\n🚀 _Please confirm my order and share estimated arrival!_`;

  return [header, customerInfo, otpSection, itemsSection, summarySection, instructions, footer]
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Formats a quick freehand shopping list into a WhatsApp order message.
 */
export function formatCustomListWhatsAppMessage(
  customListText: string,
  details: {
    customerName: string;
    phone?: string;
    address: string;
    preferredSlot?: string;
  }
): string {
  const header = `🥬 *TAZYO CUSTOM SHOPPING LIST ORDER* 🥕\n----------------------------------------`;
  
  const customerInfo = `👤 *Customer Details:*
• Name: ${details.customerName.trim()}
${details.phone ? `• Phone: ${details.phone.trim()}\n` : ''}• Address: ${details.address.trim()}${details.preferredSlot ? `\n• Slot: ${details.preferredSlot}` : ''}`;

  const listSection = `📋 *Items Needed:*\n${customListText.trim()}`;

  const footer = `----------------------------------------\n📲 _Please calculate the bill and confirm availability for home delivery._`;

  return [header, customerInfo, listSection, footer].join('\n\n');
}

/**
 * Parses freehand list lines to clean items
 */
export function parseCustomList(rawText: string): Array<{ name: string; quantity?: string }> {
  if (!rawText.trim()) return [];
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
  
  return lines.map((line) => {
    // Strip leading numbers or bullets like '1.', '1)', '-', '*'
    const cleaned = line.replace(/^(\d+[\.\)]|\-|\*|•)\s*/, '');
    const parts = cleaned.split(/[-–:]/);
    if (parts.length > 1) {
      return {
        name: parts[0].trim(),
        quantity: parts.slice(1).join('-').trim(),
      };
    }
    return { name: cleaned };
  });
}

/**
 * Generates direct wa.me link with encoded text
 */
export function getWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
