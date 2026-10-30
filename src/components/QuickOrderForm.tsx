import React, { useState } from 'react';
import { MessageCircle, FileText, Send, Sparkles, Check, Copy } from 'lucide-react';
import { formatCustomListWhatsAppMessage, getWhatsAppUrl, TAZYO_PHONE } from '../utils/order';

export const QuickOrderForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [slot, setSlot] = useState('Morning (7:00 AM - 9:30 AM)');
  const [itemsList, setItemsList] = useState(
    '1. Diced Mixed Veggies - 500g\n2. Spinach (Ozone Washed) - 2 bunches\n3. Kashmiri Apples - 1 kg\n4. Peeled Garlic - 200g'
  );
  const [sentNotice, setSentNotice] = useState(false);

  const quickPicks = [
    'Sambar Cut Veggies 500g',
    'Crying-free Diced Red Onions 500g',
    'Clean Washed Baby Spinach 250g',
    'Peeled Fresh Garlic 200g',
    'Fresh Vine Tomatoes 1kg',
    'Tender Green Bhindi 500g',
    'Ruby Pomegranate 500g',
  ];

  const handleAppendItem = (itemText: string) => {
    setItemsList((prev) => {
      const cleanPrev = prev.trim();
      if (!cleanPrev) return `1. ${itemText}`;
      const lineCount = cleanPrev.split('\n').length;
      return `${cleanPrev}\n${lineCount + 1}. ${itemText}`;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !itemsList.trim()) return;

    const formattedMessage = formatCustomListWhatsAppMessage(itemsList, {
      customerName: name,
      phone: phone,
      address: address,
      preferredSlot: slot,
    });

    const url = getWhatsAppUrl(TAZYO_PHONE, formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <section id="quick-order" className="py-16 bg-white border-t border-b border-[#e6eee2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#f36c21] text-xs font-extrabold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Type or Paste Your Grocery List</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
            Send Us Your Shopping List
          </h2>
          <p className="text-[#586756] text-base mt-2">
            Have a custom list on your notepad or mind? Type it here and we&apos;ll format a WhatsApp order instantly.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#fafbf7] border border-[#e6eee2] rounded-3xl p-6 sm:p-10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quick_name" className="block text-xs font-bold text-[#1b261b] uppercase tracking-wide mb-1.5">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="quick_name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden transition-all"
                />
              </div>

              <div>
                <label htmlFor="quick_phone" className="block text-xs font-bold text-[#1b261b] uppercase tracking-wide mb-1.5">
                  WhatsApp Contact Number
                </label>
                <input
                  id="quick_phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 98200XXXXX"
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden transition-all"
                />
              </div>
            </div>

            {/* Row 2: Delivery Address & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quick_addr" className="block text-xs font-bold text-[#1b261b] uppercase tracking-wide mb-1.5">
                  Delivery Address &amp; Flat No. <span className="text-red-500">*</span>
                </label>
                <input
                  id="quick_addr"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 301, Palm Court, Near Metro Station"
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden transition-all"
                />
              </div>

              <div>
                <label htmlFor="quick_slot" className="block text-xs font-bold text-[#1b261b] uppercase tracking-wide mb-1.5">
                  Preferred Delivery Slot
                </label>
                <select
                  id="quick_slot"
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden transition-all"
                >
                  <option value="Morning (7:00 AM - 9:30 AM)">Morning (7:00 AM - 9:30 AM)</option>
                  <option value="Evening (4:30 PM - 7:30 PM)">Evening (4:30 PM - 7:30 PM)</option>
                  <option value="Express (Within 90 Mins)">Express (Within 90 Mins)</option>
                </select>
              </div>
            </div>

            {/* Quick Tap to Add Helpers */}
            <div>
              <span className="text-xs font-bold text-stone-600 block mb-2">
                ⚡ Tap to add popular items to your list:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPicks.map((pick, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAppendItem(pick)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 border border-stone-200 hover:border-emerald-300 transition-colors shadow-2xs"
                  >
                    + {pick}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea: Custom List */}
            <div>
              <label htmlFor="quick_items" className="block text-xs font-bold text-[#1b261b] uppercase tracking-wide mb-1.5">
                Vegetable / Fruit / Cut Prep List <span className="text-red-500">*</span>
              </label>
              <textarea
                id="quick_items"
                rows={5}
                required
                value={itemsList}
                onChange={(e) => setItemsList(e.target.value)}
                placeholder="Type item names, quantities, and cut preferences (e.g.&#10;1. Sambar veggies mix - 500g&#10;2. Diced red onions - 500g&#10;3. Palak clean wash - 2 bunches)"
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden transition-all font-mono"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#18863c] to-[#136a30] hover:from-[#136a30] hover:to-[#0d4f23] text-white font-extrabold text-base shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Send Shopping List via WhatsApp 📲</span>
            </button>

            {sentNotice && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Opening WhatsApp chat with TAZYO (+91 8451887785)...</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
};
