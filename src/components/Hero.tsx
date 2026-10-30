import React from 'react';
import { MessageCircle, ShoppingBag, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { TAZYO_RAW_PHONE } from '../data/products';

interface HeroProps {
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts }) => {
  return (
    <div className="relative overflow-hidden bg-radial from-[#eaf8e6] via-[#fafbf7] to-[#f4f7f1] pt-8 pb-16 lg:py-20 border-b border-[#e6eee2]">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Delivery Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-[#18863c] text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Doorstep Home Delivery • Fresh Daily</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1b261b] leading-[1.15]">
              Fresh Produce,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18863c] to-[#38b000]">
                Clean Washed
              </span>{' '}
              &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f36c21] to-[#f78c1e]">
                Cut Ready
              </span>{' '}
              to Cook.
            </h1>

            {/* Tagline Strip matching brand */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-emerald-800 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-emerald-100 shadow-xs">
              <span className="flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vegetables &amp; Fruits
              </span>
              <span className="text-[#f36c21] font-black">•</span>
              <span className="text-emerald-900">100% Fresh</span>
              <span className="text-[#f36c21] font-black">•</span>
              <span className="text-emerald-900">Triple Washed</span>
              <span className="text-[#f36c21] font-black">•</span>
              <span className="text-emerald-900">Hygienic</span>
              <span className="text-[#f36c21] font-black">•</span>
              <span className="text-orange-700 font-extrabold">Cut to Ready to Cook</span>
            </div>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-[#586756] leading-relaxed max-w-2xl">
              Skip the exhausting peeling, washing, and chopping after a long day. 
              <strong> TAZYO</strong> delivers farm-fresh fruits &amp; vegetables, thoroughly ozonated, sanitised, and precision-chopped right to your kitchen doorstep.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={`https://wa.me/${TAZYO_RAW_PHONE}?text=Hello%20TAZYO!%20I%20would%20like%20to%20place%20an%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#18863c] to-[#136a30] hover:from-[#136a30] hover:to-[#0d4f23] text-white font-bold text-base shadow-lg shadow-emerald-700/25 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={onExploreProducts}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#f78c1e] to-[#f36c21] hover:from-[#ea5d12] hover:to-[#d94f06] text-white font-bold text-base shadow-lg shadow-orange-600/25 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Explore Products</span>
              </button>

              <a
                href="#quick-order"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-sm hover:border-emerald-300 transition-all"
              >
                <span>Type Custom List ✍️</span>
              </a>
            </div>

            {/* Quick 3 Value Props */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-100 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-stone-700">Ozone Sanitised</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-stone-700">Save 30m Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-stone-700">Zero Preservatives</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Trust Cards */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Image with border and shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square bg-emerald-50">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&fit=crop&q=80"
                  alt="Fresh hygienically cut vegetables by TAZYO"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider">Kitchen Ready</p>
                      <p className="text-sm font-bold">100% Chopped &amp; Sealed Today</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                      Fresh Today
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">
                  🔪
                </div>
                <div>
                  <p className="text-[11px] font-bold text-stone-500 uppercase">Prep Status</p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-900">Cut to Ready to Cook</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Right */}
              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-lg">
                  🚚
                </div>
                <div>
                  <p className="text-[11px] font-bold text-stone-500 uppercase">Doorstep Delivery</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#f36c21]">Morning &amp; Evening Slots</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
