import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTotal,
  formatWhatsAppOrderMessage,
  formatCustomListWhatsAppMessage,
  parseCustomList,
  getWhatsAppUrl,
  FREE_DELIVERY_THRESHOLD
} from './order';
import { CartItem, OrderDetails } from '../types';

const sampleCart: CartItem[] = [
  {
    product: {
      id: 'cut-1',
      name: 'Chopped Mixed Veggies',
      category: 'cut-ready',
      price: 65,
      unit: '500g',
      image: '',
      description: 'Diced carrots, beans, cauliflower, green peas'
    },
    quantity: 2,
    selectedCut: 'Finely Diced',
  },
  {
    product: {
      id: 'wash-1',
      name: 'Ozone-Washed Baby Spinach',
      category: 'fresh-wash',
      price: 35,
      unit: '250g',
      image: '',
      description: 'Triple-washed tender spinach leaves'
    },
    quantity: 1,
    notes: 'Please pack dry',
  }
];

const sampleDetails: OrderDetails = {
  customerName: 'Aarav Patel',
  phone: '9876543210',
  address: 'Flat 402, Green Meadows, MG Road',
  landmark: 'Near Apollo Pharmacy',
  deliverySlot: 'Morning (7:00 AM - 9:30 AM)',
  paymentMethod: 'UPI / GPay / PhonePe on Delivery',
  specialNotes: 'Ring bell twice',
};

test('calculateSubtotal sums product prices multiplied by quantities', () => {
  // 65*2 + 35*1 = 130 + 35 = 165
  const subtotal = calculateSubtotal(sampleCart);
  assert.equal(subtotal, 165);
});

test('calculateDeliveryFee charges 30 below threshold and 0 at or above threshold', () => {
  assert.equal(calculateDeliveryFee(100), 30);
  assert.equal(calculateDeliveryFee(0), 0);
  assert.equal(calculateDeliveryFee(FREE_DELIVERY_THRESHOLD - 1), 30);
  assert.equal(calculateDeliveryFee(FREE_DELIVERY_THRESHOLD), 0);
  assert.equal(calculateDeliveryFee(500), 0);
});

test('calculateTotal correctly adds subtotal and delivery fee', () => {
  assert.equal(calculateTotal(165, 30), 195);
  assert.equal(calculateTotal(320, 0), 320);
});

test('formatWhatsAppOrderMessage generates structured text containing items and address', () => {
  const msg = formatWhatsAppOrderMessage(sampleCart, sampleDetails);
  assert.match(msg, /NEW TAZYO DELIVERY ORDER/);
  assert.match(msg, /Aarav Patel/);
  assert.match(msg, /Flat 402, Green Meadows/);
  assert.match(msg, /Chopped Mixed Veggies/);
  assert.match(msg, /Finely Diced/);
  assert.match(msg, /Ozone-Washed Baby Spinach/);
  assert.match(msg, /Please pack dry/);
  assert.match(msg, /Total: ₹195/);
  assert.match(msg, /Ring bell twice/);
});

test('formatCustomListWhatsAppMessage formats freehand grocery list', () => {
  const msg = formatCustomListWhatsAppMessage(
    '1. Diced Carrots - 500g\n2. Methi Clean Wash - 2 bunches',
    {
      customerName: 'Priya Sen',
      address: 'Tower B 1204',
      phone: '9123456789'
    }
  );
  assert.match(msg, /TAZYO CUSTOM SHOPPING LIST ORDER/);
  assert.match(msg, /Priya Sen/);
  assert.match(msg, /Methi Clean Wash/);
});

test('parseCustomList extracts item names and quantity parts', () => {
  const input = `
    1. Sambar Veg Cut Mix - 500g
    2) Fresh Palak (Washed) - 2 Bunches
    * Tomatoes : 1kg
    Baby Potatoes
  `;
  const parsed = parseCustomList(input);
  assert.equal(parsed.length, 4);
  assert.equal(parsed[0].name, 'Sambar Veg Cut Mix');
  assert.equal(parsed[0].quantity, '500g');
  assert.equal(parsed[1].name, 'Fresh Palak (Washed)');
  assert.equal(parsed[1].quantity, '2 Bunches');
  assert.equal(parsed[2].name, 'Tomatoes');
  assert.equal(parsed[2].quantity, '1kg');
  assert.equal(parsed[3].name, 'Baby Potatoes');
  assert.equal(parsed[3].quantity, undefined);
});

test('getWhatsAppUrl encodes phone and message properly', () => {
  const url = getWhatsAppUrl('+91 8451887785', 'Hello TAZYO!');
  assert.equal(url, 'https://wa.me/918451887785?text=Hello%20TAZYO!');
});
