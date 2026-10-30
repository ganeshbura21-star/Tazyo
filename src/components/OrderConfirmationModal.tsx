import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, ShieldCheck, KeyRound, ExternalLink, PackageCheck } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryOtp: string;
  whatsappUrl: string;
  cartItems: CartItem[];
  orderDetails: OrderDetails;
  totalAmount: number;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  deliveryOtp,
  whatsappUrl,
  cartItems,
  orderDetails,
  totalAmount,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `TAZYO Order Delivery OTP: ${deliveryOtp}\nName: ${orderDetails.customerName}\nTotal: ₹${totalAmount}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200 z-10 animate-scaleUp">
        
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-br from-emerald-600 to-[#18863c] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-md text-2xl">
            <PackageCheck className="w-8 h-8 text-[#18863c]" />
          </div>

          <h3 className="text-xl font-black">
            Order Ready for Delivery!
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Produce reserved &amp; scheduled for {orderDetails.deliverySlot}
          </p>
        </div>

        {/* Delivery OTP Box */}
        <div className="p-6 space-y-5">
          <div className="bg-[#fafbf7] border-2 border-emerald-200 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
              <KeyRound className="w-4 h-4 text-emerald-600" />
              <span>Doorstep Delivery Verification OTP</span>
            </div>

            {/* 4 Digit OTP Badge */}
            <div className="flex items-center justify-center gap-2.5 my-2">
              {deliveryOtp.split('').map((digit, i) => (
                <div
                  key={i}
                  className="w-11 h-12 rounded-xl bg-white border-2 border-emerald-500 shadow-sm flex items-center justify-center text-2xl font-black text-emerald-900"
                >
                  {digit}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-stone-600 leading-snug mt-2">
              🔐 <strong>Share this 4-digit code</strong> with the TAZYO delivery agent at your door to verify secure handover of your produce.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="text-xs space-y-1.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
            <div className="flex justify-between text-stone-600">
              <span>Customer:</span>
              <strong className="text-stone-900">{orderDetails.customerName}</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery To:</span>
              <span className="text-stone-900 font-semibold truncate max-w-[200px]">
                {orderDetails.address}
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Items Count:</span>
              <span className="text-stone-900 font-semibold">{cartItems.length} items</span>
            </div>
            <div className="flex justify-between text-stone-900 font-extrabold pt-1 border-t border-stone-200">
              <span>Estimated Bill:</span>
              <span className="text-[#18863c] text-sm">₹{totalAmount}</span>
            </div>
          </div>

          {/* Primary Action: Open WhatsApp */}
          <div className="space-y-2">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#18863c] to-[#136a30] hover:from-[#136a30] hover:to-[#0d4f23] text-white font-extrabold text-sm shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Confirm Order on WhatsApp 📲</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Order &amp; OTP Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>Copy Delivery OTP &amp; Summary</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
