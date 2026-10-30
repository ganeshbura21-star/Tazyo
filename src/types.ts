export type ProductCategory = 
  | 'all'
  | 'cut-ready'
  | 'fresh-wash'
  | 'daily-veggies'
  | 'fruits'
  | 'combos';

export type CutOption = 
  | 'Whole Washed'
  | 'Finely Diced'
  | 'Sambar / Stew Chunks'
  | 'Julienne / Strips'
  | 'Grated / Shredded'
  | 'Boiled / Ready to Steam';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  price: number;
  unit: string; // e.g. '500g', '250g', '1 kg', '1 Bunch', 'Pack'
  image: string;
  description: string;
  badge?: string; // e.g. 'Bestseller', 'Ozone Washed', 'Zero Prep', 'Farm Fresh'
  cutOptions?: CutOption[];
  popular?: boolean;
  calories?: string;
  shelfLife?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCut?: CutOption;
  notes?: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  deliverySlot: 'Morning (7:00 AM - 9:30 AM)' | 'Evening (4:30 PM - 7:30 PM)' | 'Express (Within 90 Mins)';
  paymentMethod: 'UPI / GPay / PhonePe on Delivery' | 'Cash on Delivery' | 'Prepaid via WhatsApp';
  specialNotes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  rating: number;
  quote: string;
  favoriteItem: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProductReview {
  id: string;
  productId: string; // matches product id or 'general'
  productName: string;
  customerName: string;
  area: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string; // ISO or human friendly e.g. 'Oct 28, 2026'
  timestamp: number; // For sorting
  verifiedPurchase: boolean;
  tag?: string; // e.g. 'Saved 20m prep', 'Crisp & fresh', 'Zero mud'
  helpfulCount?: number;
}

