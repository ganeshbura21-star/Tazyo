import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-[#e6eee2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#18863c] text-xs font-extrabold uppercase tracking-wider mb-2">
            <span>Loved by Home Cooks &amp; Chefs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
            What Our Daily Customers Say
          </h2>
          <p className="text-[#586756] text-base mt-2">
            Real feedback from busy parents, working professionals, and health enthusiasts who saved hours every week with TAZYO.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#fafbf7] rounded-3xl p-6 border border-[#e6eee2] shadow-xs flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-stone-700 italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-stone-500 font-medium">{t.area}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {t.favoriteItem}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
