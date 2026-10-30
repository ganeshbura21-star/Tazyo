import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, ShoppingBag, Truck, ShieldCheck, KeyRound, UserCheck } from 'lucide-react';
import { CartItem, CutOption, OrderDetails } from '../types';
import { UserProfile, generateDeliveryOTP } from '../utils/auth';
import {
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTotal,
  formatWhatsAppOrderMessage,
  getWhatsAppUrl,
  FREE_DELIVERY_THRESHOLD,
  TAZYO_PHONE
} from '../utils/order';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  user: UserProfile | null;
  onOpenLogin: () => void;
  onUpdateQuantity: (productId: string, quantity: number, cut?: CutOption) => void;
  onRemoveItem: (productId: string, cut?: CutOption) => void;
  onClearCart: () => void;
  onOrderPlaced: (orderData: {
    deliveryOtp: string;
    whatsappUrl: string;
    cartItems: CartItem[];
    orderDetails: OrderDetails;
    totalAmount: number;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  user,
  onOpenLogin,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [details, setDetails] = useState<OrderDetails>({
    customerName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    landmark: user?.landmark || '',
    deliverySlot: 'Morning (7:00 AM - 9:30 AM)',
    paymentMethod: 'UPI / GPay / PhonePe on Delivery',
    specialNotes: '',
  });

  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  // Sync when user logs in
  useEffect(() => {
    if (user) {
      setDetails((prev) => ({
        ...prev,
        customerName: prev.customerName || user.name,
        phone: prev.phone || user.phone,
        address: prev.address || user.address || '',
        landmark: prev.landmark || user.landmark || '',
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = calculateTotal(subtotal, deliveryFee);
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.customerName.trim()) {
      setFormError('Please enter your name');
      return;
    }
    if (!details.address.trim()) {
      setFormError('Please enter your delivery address');
      return;
    }
    setFormError('');

    // Generate secure 4-digit Delivery Verification OTP
    const deliveryOtp = generateDeliveryOTP();
    const message = formatWhatsAppOrderMessage(cartItems, details, deliveryOtp);
    const url = getWhatsAppUrl(TAZYO_PHONE, message);

    onClose();
    onOrderPlaced({
      deliveryOtp,
      whatsappUrl: url,
      cartItems,
      orderDetails: details,
      totalAmount: total,
    });
  };

  const handleCopySummary = () => {
    if (!details.customerName || !details.address) {
      setFormError('Please enter your name & address before copying');
      return;
    }
    setFormError('');
    const deliveryOtp = generateDeliveryOTP();
    const message = formatWhatsAppOrderMessage(cartItems, details, deliveryOtp);
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#fafbf7]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-stone-900 leading-tight">Your Fresh Bag</h2>
              <p className="text-xs text-stone-500 font-medium">
                {cartItems.length} unique produce item(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold px-2 py-1 rounded-md hover:bg-rose-50 cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close bag drawer"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Login status prompt */}
        {!user ? (
          <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs">
            <span className="text-amber-900 font-medium">
              📱 Have an account? Log in with OTP for saved address &amp; OTP orders.
            </span>
            <button
              onClick={onOpenLogin}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[11px] cursor-pointer shrink-0 ml-2"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-bold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ordering as <strong>{user.name}</strong> (+91 {user.phone})</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
              OTP Verified
            </span>
          </div>
        )}

        {/* Free Delivery Meter */}
        <div className="bg-emerald-50/80 px-5 py-3 border-b border-emerald-100 text-xs">
          <div className="flex items-center justify-between font-bold text-emerald-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              {amountToFreeDelivery > 0 ? (
                <>Add <strong className="text-emerald-700 font-extrabold">₹{amountToFreeDelivery}</strong> more for FREE Delivery!</>
              ) : (
                <span className="text-emerald-800 font-extrabold">🎉 You unlocked FREE Home Delivery!</span>
              )}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#18863c] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-3xl">
                🥬
              </div>
              <p className="font-extrabold text-stone-700 text-base">Your bag is empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our washed leafy greens, ready-cut sambar veggies, and fresh seasonal fruits to get started!
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs mt-2 cursor-pointer"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Produce Selected:
                </p>
                {cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedCut || 'default'}-${idx}`}
                    className="p-3 rounded-2xl border border-stone-200 bg-[#fafbf7] flex gap-3 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-100"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-extrabold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-extrabold text-[#18863c] whitespace-nowrap">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span>{item.product.unit}</span>
                        {item.selectedCut && (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {item.selectedCut}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-1 py-0.5">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedCut
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 text-xs cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold px-1 text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedCut
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-6 h-6 rounded flex items-center justify-center text-emerald-700 hover:bg-emerald-50 text-xs cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedCut)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="pt-3 border-t border-stone-200 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Doorstep Delivery Information:
                </p>

                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl">
                    ⚠️ {formError}
                  </div>
                )}

                <div>
                  <label htmlFor="cart_name" className="block text-[11px] font-bold text-stone-600 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cart_name"
                    type="text"
                    required
                    placeholder="e.g. Meera Kapoor"
                    value={details.customerName}
                    onChange={(e) =>
                      setDetails({ ...details, customerName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-hidden font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="cart_phone" className="block text-[11px] font-bold text-stone-600 mb-1">
                      WhatsApp Phone
                    </label>
                    <input
                      id="cart_phone"
                      type="tel"
                      placeholder="e.g. 98199XXXXX"
                      value={details.phone}
                      onChange={(e) =>
                        setDetails({ ...details, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label htmlFor="cart_slot" className="block text-[11px] font-bold text-stone-600 mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      id="cart_slot"
                      value={details.deliverySlot}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          deliverySlot: e.target.value as OrderDetails['deliverySlot'],
                        })
                      }
                      className="w-full px-2 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-hidden font-semibold"
                    >
                      <option value="Morning (7:00 AM - 9:30 AM)">Morning (7-9:30 AM)</option>
                      <option value="Evening (4:30 PM - 7:30 PM)">Evening (4:30-7:30 PM)</option>
                      <option value="Express (Within 90 Mins)">Express (Within 90 Mins)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cart_address" className="block text-[11px] font-bold text-stone-600 mb-1">
                    Full Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="cart_address"
                    rows={2}
                    required
                    placeholder="Flat No., Society / Building Name, Street"
                    value={details.address}
                    onChange={(e) =>
                      setDetails({ ...details, address: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Landmark / Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Opposite City Mall / Leave at door"
                    value={details.specialNotes}
                    onChange={(e) =>
                      setDetails({ ...details, specialNotes: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-hidden font-medium"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Bill and Primary Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#fafbf7] space-y-3">
            {/* Bill breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-bold text-stone-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Charge</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    <span>₹{deliveryFee}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Estimated Total</span>
                <span className="text-[#18863c]">₹{total}</span>
              </div>
            </div>

            {/* Doorstep Delivery OTP Note */}
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <KeyRound className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Includes <strong>Doorstep OTP Verification</strong> for 100% safe handover!</span>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#18863c] to-[#136a30] hover:from-[#136a30] hover:to-[#0d4f23] text-white font-extrabold text-sm shadow-md shadow-emerald-700/30 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Place Order &amp; Get Delivery OTP 📲</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Order Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Order Receipt</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-semibold text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pay on delivery via Cash or UPI (GPay / PhonePe / Paytm)</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
