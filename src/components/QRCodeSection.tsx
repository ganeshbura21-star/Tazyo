import React, { useState } from 'react';
import { MessageCircle, QrCode, Copy, Check, ExternalLink, PhoneCall } from 'lucide-react';
import { QR_CODE_URL, TAZYO_PHONE_NUMBER, TAZYO_RAW_PHONE } from '../data/products';

export const QRCodeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(TAZYO_PHONE_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="qr-section" className="py-16 bg-gradient-to-br from-[#eef9e8] via-[#fafbf7] to-[#fef4ec]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#18863c] text-xs font-extrabold uppercase tracking-wider mb-3">
          <QrCode className="w-3.5 h-3.5" />
          <span>Instant WhatsApp Connect</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
          Scan &amp; Chat Directly on WhatsApp
        </h2>
        <p className="text-[#586756] text-base sm:text-lg mt-2 max-w-xl mx-auto">
          Point your smartphone camera to connect immediately with our official business line for questions, daily rates, or quick orders.
        </p>

        {/* QR Code Container */}
        <div className="my-8 inline-block p-6 sm:p-8 bg-white rounded-3xl shadow-xl border-2 border-emerald-100 hover:shadow-2xl transition-all">
          <div className="relative mx-auto w-56 sm:w-64 aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-white p-2">
            <img
              src={QR_CODE_URL}
              alt="TAZYO WhatsApp Business Account QR Code"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              WhatsApp Business Account
            </p>
            <p className="text-lg font-extrabold text-[#1b261b]">
              {TAZYO_PHONE_NUMBER}
            </p>
            <p className="text-xs text-stone-500">
              Tazyo Vegetable fruit Home delivery service
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/${TAZYO_RAW_PHONE}?text=Hello%20TAZYO%20Team!%20I%20would%20like%20to%20know%20more%20about%20your%20produce.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#f78c1e] to-[#f36c21] hover:from-[#ea5d12] hover:to-[#d94f06] text-white font-bold text-sm shadow-md shadow-orange-600/30 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleCopyPhone}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied +91 8451887785</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-500" />
                <span>Copy Number</span>
              </>
            )}
          </button>

          <a
            href={`tel:${TAZYO_PHONE_NUMBER}`}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>Direct Call</span>
          </a>
        </div>

      </div>
    </section>
  );
};
