import React, { useState, useMemo } from 'react';
import { Star, MessageSquarePlus, Filter, ThumbsUp, ShieldCheck, Search, Sparkles, Check } from 'lucide-react';
import { ProductReview } from '../types';
import { RatingStars } from './RatingStars';
import { calculateProductRating, filterAndSortReviews } from '../utils/reviews';
import { PRODUCTS } from '../data/products';

interface ReviewsSectionProps {
  reviews: ProductReview[];
  onOpenReviewModal: (productId?: string) => void;
  onHelpfulClick: (reviewId: string) => void;
  selectedProductFilter?: string;
  onProductFilterChange?: (productId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenReviewModal,
  onHelpfulClick,
  selectedProductFilter = 'all',
  onProductFilterChange,
}) => {
  const [internalProductFilter, setInternalProductFilter] = useState<string>(selectedProductFilter);
  const [starFilter, setStarFilter] = useState<number>(0); // 0 = all
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent');

  const activeProduct = onProductFilterChange ? selectedProductFilter : internalProductFilter;
  const setProduct = onProductFilterChange || setInternalProductFilter;

  // Stats computed on the active product filter or all
  const stats = useMemo(() => {
    return calculateProductRating(
      reviews,
      activeProduct !== 'all' ? activeProduct : undefined
    );
  }, [reviews, activeProduct]);

  // Filtered and sorted review list
  const filteredReviews = useMemo(() => {
    return filterAndSortReviews(reviews, {
      productId: activeProduct,
      ratingFilter: starFilter,
      sortBy: sortBy,
      searchQuery: searchQuery,
    });
  }, [reviews, activeProduct, starFilter, sortBy, searchQuery]);

  return (
    <section id="reviews" className="py-16 bg-white border-b border-[#e6eee2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#18863c] text-xs font-extrabold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
              Customer Reviews &amp; Ratings
            </h2>
            <p className="text-[#586756] text-base mt-1">
              Read real feedback on our chopped produce freshness, ozone wash quality, and doorstep delivery.
            </p>
          </div>

          <button
            onClick={() => onOpenReviewModal(activeProduct !== 'all' ? activeProduct : undefined)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#18863c] hover:bg-[#136a30] text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 transition-all hover:scale-105 cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Overall Rating & Breakdown Card */}
        <div className="bg-[#fafbf7] rounded-3xl p-6 sm:p-8 border border-[#e6eee2] mb-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score Big Display */}
            <div className="lg:col-span-4 text-center lg:text-left lg:border-r border-stone-200 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-5xl sm:text-6xl font-black text-stone-900 tracking-tight">
                  {stats.average > 0 ? stats.average : '5.0'}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <RatingStars value={Math.round(stats.average)} size="md" />
                  </div>
                  <p className="text-xs font-bold text-stone-500 mt-1">
                    Based on {stats.count} verified reviews
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-800 font-semibold mt-3 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                ✨ <strong>98% of customers</strong> recommend TAZYO for weekday kitchen meal prep.
              </p>
            </div>

            {/* Star Breakdown Bars */}
            <div className="lg:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.breakdown[star] || 0;
                const percent = stats.percentBreakdown[star] || 0;
                const isSelected = starFilter === star;

                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStarFilter(isSelected ? 0 : star)}
                    className={`w-full flex items-center gap-3 p-1 rounded-xl transition-colors cursor-pointer group text-left ${
                      isSelected ? 'bg-amber-100/60 font-bold' : 'hover:bg-white'
                    }`}
                  >
                    <span className="text-xs font-bold text-stone-700 w-12 flex items-center gap-1">
                      <span>{star}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </span>

                    {/* Progress Track */}
                    <div className="flex-1 bg-stone-200/80 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-2.5 rounded-full group-hover:bg-amber-500 transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <span className="text-xs text-stone-500 font-semibold w-12 text-right">
                      {count} ({percent}%)
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-[#fafbf7] border border-[#e6eee2]">
          
          {/* Product Filter */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <Filter className="w-4 h-4 text-stone-500 shrink-0" />
            <select
              value={activeProduct}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full text-xs font-bold bg-white border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:ring-2 focus:ring-emerald-500 outline-hidden"
            >
              <option value="all">All Products &amp; Services ({reviews.length})</option>
              <option value="general">General TAZYO Delivery</option>
              {PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </select>
          </div>

          {/* Star Filter Quick Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setStarFilter(0)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                starFilter === 0
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              All Stars
            </button>
            {[5, 4, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStarFilter(starFilter === s ? 0 : s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  starFilter === s
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                <span>{s}★</span>
              </button>
            ))}
          </div>

          {/* Search in Reviews */}
          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-hidden"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-stone-500 uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold bg-white border border-stone-200 rounded-xl px-2.5 py-2 text-stone-800 outline-hidden"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>

        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-14 bg-[#fafbf7] rounded-3xl border border-stone-200 p-8">
            <span className="text-3xl">📝</span>
            <h4 className="text-base font-bold text-stone-800 mt-2">
              No matching reviews found
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Be the first to review this product or try adjusting your search/star filters.
            </p>
            <button
              onClick={() => onOpenReviewModal(activeProduct !== 'all' ? activeProduct : undefined)}
              className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 rounded-full bg-emerald-600 text-white text-xs font-bold"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Write the First Review</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#fafbf7] rounded-2xl p-5 border border-[#e6eee2] hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Customer info, rating, verified badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {rev.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-stone-900 leading-tight">
                            {rev.customerName}
                          </h4>
                          {rev.verifiedPurchase && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md" title="Verified Customer">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">{rev.area}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <RatingStars value={rev.rating} size="sm" />
                      <span className="text-[10px] text-stone-400 block mt-0.5">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  {/* Product Tag */}
                  <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setProduct(rev.productId)}
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-800 hover:bg-emerald-100 hover:text-emerald-900 transition-colors"
                    >
                      📦 {rev.productName}
                    </button>
                    {rev.tag && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {rev.tag}
                      </span>
                    )}
                  </div>

                  {/* Title & Comment */}
                  {rev.title && (
                    <h5 className="font-bold text-stone-900 text-sm mb-1">
                      {rev.title}
                    </h5>
                  )}
                  <p className="text-xs text-[#586756] leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                {/* Helpful Action */}
                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-[11px]">Was this review helpful?</span>
                  <button
                    type="button"
                    onClick={() => onHelpfulClick(rev.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs shadow-2xs active:scale-95 transition-all cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3 text-emerald-600" />
                    <span>Helpful ({rev.helpfulCount || 0})</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
