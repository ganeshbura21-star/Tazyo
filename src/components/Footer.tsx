import React from 'react';
import { MessageCircle, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { LOGO_BANNER_URL, TAZYO_PHONE_NUMBER, TAZYO_RAW_PHONE } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#11381c] text-white pt-16 pb-12 border-t-4 border-[#18863c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Col 1: Brand Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white p-1 overflow-hidden shrink-0">
                <img
                  src={LOGO_BANNER_URL}
                  alt="TAZYO Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  <span className="text-emerald-400">TAZ</span>
                  <span className="text-orange-400">YO</span>
                </span>
                <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  Home Delivery Service
                </p>
              </div>
            </div>

            <p className="text-xs text-[#b0c9b6] leading-relaxed">
              Delivering farm-fresh vegetables &amp; seasonal fruits thoroughly ozonated, clean-washed, and precision cut so you can cook delicious meals effortlessly.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Food-Grade Sealed Packaging</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#b0c9b6]">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  🥬 Fresh Products &amp; Cut Combos
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  ✨ Why Choose TAZYO
                </a>
              </li>
              <li>
                <a href="#hygiene" className="hover:text-white transition-colors">
                  💧 3-Stage Ozone Washing Process
                </a>
              </li>
              <li>
                <a href="#quick-order" className="hover:text-white transition-colors">
                  ✍️ Quick Shopping List Order
                </a>
              </li>
              <li>
                <a href="#qr-section" className="hover:text-white transition-colors">
                  📱 WhatsApp Business QR Code
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Delivery Slots & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-200">
              Delivery Hours
            </h4>
            <div className="space-y-2 text-xs text-[#b0c9b6]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Morning Slot:</p>
                  <p>7:00 AM – 9:30 AM (Cook fresh breakfast &amp; lunch)</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Evening Slot:</p>
                  <p>4:30 PM – 7:30 PM (Dinner prep made easy)</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Doorstep Service:</p>
                  <p>Same-day express delivery across city zones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-200">
              Direct Contact
            </h4>
            <p className="text-xs text-[#b0c9b6]">
              Have a bulk order or special request? Connect with our kitchen team right away:
            </p>

            <a
              href={`https://wa.me/${TAZYO_RAW_PHONE}?text=Hello%20TAZYO!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors w-full justify-center"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp: {TAZYO_PHONE_NUMBER}</span>
            </a>

            <a
              href={`tel:${TAZYO_PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/40 hover:bg-stone-900/60 border border-emerald-800 text-stone-200 text-xs font-semibold transition-colors w-full justify-center"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call: {TAZYO_PHONE_NUMBER}</span>
            </a>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d9c84] gap-4 text-center sm:text-left">
          <p>
            © 2026 <strong>TAZYO</strong> Home Delivery Service. Fresh Produce • Wash • Hygienic • Cut to Ready to Cook.
          </p>
          <div className="flex items-center gap-1">
            <span>Prepared with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>for healthy homes.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
