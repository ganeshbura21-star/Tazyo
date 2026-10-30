import React from 'react';
import { MessageCircle } from 'lucide-react';
import { TAZYO_RAW_PHONE } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${TAZYO_RAW_PHONE}?text=Hello%20TAZYO%20Team%2C%20I%20have%20an%20inquiry%20about%20ordering%20fresh%20vegetables.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TAZYO on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-extrabold text-sm shadow-xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all group"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#25d366] animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-[#25d366]" />
      </div>
      <span className="tracking-wide">Chat on WhatsApp</span>
    </a>
  );
};
