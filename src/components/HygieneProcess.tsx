import React from 'react';
import { ShieldCheck, Droplet, Scissors, PackageCheck, Sparkles } from 'lucide-react';

export const HygieneProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Dawn Sourcing & Inspection',
      subtitle: 'सुबह 4 बजे ताजी आवक',
      desc: 'Selected directly from regional vegetable mandis and local farms. Only firm, unblemished, Grade-A produce passes our entry check.',
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      tag: 'Strict Sorting',
    },
    {
      num: '02',
      title: '3-Stage RO & Ozone Wash',
      subtitle: '3-स्तरीय ओजोन धुलाई',
      desc: 'Triple-dip rinse followed by food-grade Ozone micro-bubbles. Eliminates 99.9% of soil, mud, surface microbes, and pesticides without harmful chemicals.',
      icon: <Droplet className="w-6 h-6 text-sky-600" />,
      tag: 'Zero Soil & Grit',
    },
    {
      num: '03',
      title: 'Zero-Touch Precision Cut',
      subtitle: 'हाथों के बिना सटीक कटाई',
      desc: 'Chopped with laser-sharp food grade stainless steel blades in a temperature-controlled sterile prep kitchen with sanitized gloves and aprons.',
      icon: <Scissors className="w-6 h-6 text-orange-600" />,
      tag: 'Clean Blades',
    },
    {
      num: '04',
      title: 'Sealed & Chilled Delivery',
      subtitle: 'सुरक्षित सील व घर तक डिलीवरी',
      desc: 'Sealed in breathable micro-perforated pouches or vacuum containers. Transported in cool crates straight to your doorstep before cooking time.',
      icon: <PackageCheck className="w-6 h-6 text-emerald-600" />,
      tag: 'Stay Fresh 3-5 Days',
    },
  ];

  return (
    <section id="hygiene" className="py-16 bg-[#fafbf7] border-b border-[#e6eee2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#18863c] text-xs font-extrabold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Food Safety Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
            Our 4-Step Hygiene &amp; Clean Wash Promise
          </h2>
          <p className="text-[#586756] text-base mt-2">
            From farm harvest to your frying pan—how we ensure you never have to scrub dirty spinach or shed tears peeling onions again.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#e6eee2] shadow-xs hover:shadow-lg transition-all duration-300 relative flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-emerald-700/30">
                  {step.num}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {step.tag}
                </span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center mb-4">
                {step.icon}
              </div>

              <h3 className="text-lg font-extrabold text-[#1b261b] mb-0.5">
                {step.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-2">
                {step.subtitle}
              </p>

              <p className="text-xs text-[#586756] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shrink-0">
              💧
            </div>
            <div>
              <h4 className="text-lg font-bold text-stone-900">
                Why food-grade Ozone wash matters?
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Normal tap water cannot dissolve chemical pesticide residues or microscopic soil fungi. TAZYO&apos;s active ozone wash breaks down toxins naturally into oxygen, giving you pure greens safe even for raw salads!
              </p>
            </div>
          </div>
          <a
            href="#products"
            className="px-5 py-3 rounded-full bg-[#18863c] hover:bg-[#136a30] text-white font-bold text-xs whitespace-nowrap shadow-sm transition-all"
          >
            Order Ozone Washed Produce →
          </a>
        </div>

      </div>
    </section>
  );
};
