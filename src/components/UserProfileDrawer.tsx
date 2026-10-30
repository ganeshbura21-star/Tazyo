import React, { useState } from 'react';
import { X, User, Phone, MapPin, ShieldCheck, LogOut, Package, Clock, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../utils/auth';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  onUpdateAddress: (address: string, landmark?: string) => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onUpdateAddress,
}) => {
  const [address, setAddress] = useState(user?.address || '');
  const [landmark, setLandmark] = useState(user?.landmark || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAddress(address, landmark);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-[#fafbf7]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#18863c] text-white flex items-center justify-center font-black text-lg shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base leading-tight">
                {user.name}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                +91 {user.phone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Profile Drawer"
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Verified Customer Status */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                Verified Customer Profile
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Eligible for instant WhatsApp orders and doorstep OTP verification.
              </p>
            </div>
          </div>

          {/* Default Delivery Address Form */}
          <div className="bg-[#fafbf7] p-4 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-stone-800 uppercase tracking-wide">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Default Delivery Address</span>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Full Address &amp; Flat No.
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 302, Palm Heights, Link Road"
                  className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Metro Pillar 142"
                  className="w-full p-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {savedSuccess && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Address saved!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-[#18863c] text-white text-xs font-bold rounded-xl hover:bg-[#136a30] transition-colors cursor-pointer"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>

          {/* Order Delivery OTP Information */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-stone-800 uppercase tracking-wide">
              <Package className="w-4 h-4 text-[#f36c21]" />
              <span>Doorstep Delivery OTP Protection</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every online order dispatched generates an encrypted 4-digit Delivery OTP.
              Share it with our delivery agent to confirm receiving your fresh sealed box!
            </p>
          </div>

        </div>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-stone-100 bg-[#fafbf7]">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Account</span>
          </button>
        </div>

      </div>
    </div>
  );
};
