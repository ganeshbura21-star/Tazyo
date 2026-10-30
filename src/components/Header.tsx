import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Phone, Menu, X, User, UserCheck, Star } from 'lucide-react';
import { LOGO_BANNER_URL, TAZYO_PHONE_NUMBER, TAZYO_RAW_PHONE } from '../data/products';
import { UserProfile } from '../utils/auth';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  user: UserProfile | null;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  user,
  onOpenLogin,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e6eee2] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-white border border-emerald-100 shadow-sm flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
            <img 
              src={LOGO_BANNER_URL} 
              alt="TAZYO Logo" 
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none">
              <span className="text-[#18863c]">TAZ</span>
              <span className="text-[#f36c21]">YO</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-800 mt-1">
              Vegetables &amp; Fruits • Ready to Cook
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] font-bold text-[#1b261b]">
          <a href="#products" className="hover:text-[#18863c] transition-colors">Products</a>
          <a href="#services" className="hover:text-[#18863c] transition-colors">Why TAZYO</a>
          <a href="#hygiene" className="hover:text-[#18863c] transition-colors">Clean Wash</a>
          <a href="#quick-order" className="hover:text-[#18863c] transition-colors">Custom List</a>
          <a href="#reviews" className="hover:text-[#18863c] flex items-center gap-1 transition-colors">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Reviews</span>
          </a>
          <a href="#qr-section" className="hover:text-[#18863c] transition-colors">WhatsApp QR</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Customer Login / Profile Trigger */}
          {user ? (
            <button
              onClick={onOpenProfile}
              aria-label="Open User Profile"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-bold text-xs transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-black">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[90px] truncate hidden sm:inline">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span>Login</span>
            </button>
          )}

          {/* Direct WhatsApp Quick Contact */}
          <a
            href={`https://wa.me/${TAZYO_RAW_PHONE}?text=Hello%20TAZYO!%20I%20would%20like%20to%20order%20fresh%20produce.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
            <span className="hidden xl:inline">+91 8451887785</span>
          </a>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label={`View Shopping Bag with ${cartCount} items`}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#18863c] hover:bg-[#136a30] text-white font-bold text-sm shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="bg-[#f36c21] text-white text-xs px-2 py-0.5 rounded-full font-black animate-pulse">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="text-emerald-100 text-xs hidden sm:inline border-l border-emerald-600 pl-2">
                ₹{cartTotal}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-stone-700 hover:text-emerald-700 hover:bg-stone-100 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e6eee2] bg-white px-5 py-4 space-y-3 animate-fadeIn">
          {user ? (
            <div className="p-3 bg-emerald-50 rounded-2xl flex items-center justify-between border border-emerald-200 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">{user.name}</p>
                  <p className="text-[10px] text-emerald-700">+91 {user.phone}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="text-xs font-bold text-emerald-800 underline"
              >
                Profile
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs mb-2"
            >
              <User className="w-4 h-4" />
              <span>Login with Mobile OTP</span>
            </button>
          )}

          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1b261b] hover:text-[#18863c] py-1"
          >
            🥬 Fresh Products Catalog
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1b261b] hover:text-[#18863c] py-1"
          >
            ⭐ Customer Reviews &amp; Ratings
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1b261b] hover:text-[#18863c] py-1"
          >
            ✨ Why TAZYO
          </a>
          <a
            href="#hygiene"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1b261b] hover:text-[#18863c] py-1"
          >
            💧 3-Stage Wash &amp; Hygiene
          </a>
          <a
            href="#quick-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1b261b] hover:text-[#18863c] py-1"
          >
            📝 Quick Custom Shopping List
          </a>
          <a
            href="#qr-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1b261b] hover:text-[#18863c] py-1"
          >
            📱 WhatsApp QR Code
          </a>
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${TAZYO_RAW_PHONE}?text=Hello%20TAZYO!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us ({TAZYO_PHONE_NUMBER})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
