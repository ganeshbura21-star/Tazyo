import React from 'react';
import { Sparkles, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: '🥦',
      title: 'Fresh Vegetables',
      hindi: 'ताजी सब्जियां',
      desc: 'Crisp, hand-picked daily vegetables sourced directly from regional farmers for your kitchen table.',
      tag: 'Hand-picked Daily',
      color: 'from-emerald-500 to-green-600',
      bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      icon: '🍎',
      title: 'Seasonal Fruits',
      hindi: 'मौसमी मीठे फल',
      desc: 'Naturally sweet, ripe, and nutrient-packed fruits carefully inspected for sweetness and quality.',
      tag: 'No Carbide Ripening',
      color: 'from-amber-500 to-orange-500',
      bgLight: 'bg-orange-50 text-orange-800 border-orange-200',
    },
    {
      icon: '🚿',
      title: 'Clean Fresh Wash',
      hindi: 'स्वच्छ व जीवाणुरहित धुलाई',
      desc: 'Thoroughly rinsed in RO and food-grade Ozone micro-bubbles. Free from mud, grit, and surface contaminants.',
      tag: 'Ozone Sanitised',
      color: 'from-cyan-500 to-blue-600',
      bgLight: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    {
      icon: '🔪',
      title: 'Ready to Cook Cut',
      hindi: 'काट कर पकाने के लिए तैयार',
      desc: 'Hygienically diced, sliced, grated or cubed with stainless steel blades. Ready to toss into your pan or pot.',
      tag: 'Zero Prep Time',
      color: 'from-rose-500 to-red-600',
      bgLight: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  return (
    <section id="services" className="py-16 bg-white border-b border-[#e6eee2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#18863c] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The TAZYO Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
            Why Order From TAZYO?
          </h2>
          <p className="text-[#586756] text-base sm:text-lg mt-2">
            Farm fresh produce prepared with utmost hygiene for fast, healthy, and effortless cooking.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#fafbf7] hover:bg-white rounded-2xl p-6 border border-[#e6eee2] hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-3 ${item.bgLight}`}>
                {item.tag}
              </span>

              <h3 className="text-xl font-bold text-[#1b261b] mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-2">
                {item.hindi}
              </p>

              <p className="text-sm text-[#586756] leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="mt-auto flex items-center gap-1 text-xs font-bold text-emerald-700 pt-2 border-t border-emerald-100/60 w-full justify-center">
                <Check className="w-3.5 h-3.5" />
                <span>100% Guaranteed Fresh</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
