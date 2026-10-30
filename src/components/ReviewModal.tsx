import React, { useState } from 'react';
import { X, Check, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { PRODUCTS } from '../data/products';
import { ProductReview } from '../types';
import { validateReview } from '../utils/reviews';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<ProductReview, 'id' | 'timestamp' | 'helpfulCount'>) => void;
  defaultProductId?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  defaultProductId = 'general',
}) => {
  const [productId, setProductId] = useState<string>(defaultProductId);
  const [rating, setRating] = useState<number>(5);
  const [customerName, setCustomerName] = useState('');
  const [area, setArea] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState('Prep Time Saved ⏱️');
  const [verifiedPurchase, setVerifiedPurchase] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Sync defaultProductId when opening
  React.useEffect(() => {
    if (defaultProductId) {
      setProductId(defaultProductId);
    }
  }, [defaultProductId, isOpen]);

  if (!isOpen) return null;

  const popularTags = [
    'Prep Time Saved ⏱️',
    'Super Fresh 🥬',
    'Triple Washed 💧',
    'Zero Tears 🧅',
    'Great Value 💰',
    'Fast WhatsApp Delivery 🚚',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedProduct = PRODUCTS.find((p) => p.id === productId);
    const productName =
      productId === 'general'
        ? 'TAZYO Home Delivery Service'
        : selectedProduct
        ? selectedProduct.name
        : 'Fresh Produce';

    const validation = validateReview({
      customerName,
      rating,
      comment,
      productId,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    const todayStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date());

    onSubmitReview({
      productId,
      productName,
      customerName: customerName.trim(),
      area: area.trim() || 'Verified Customer',
      rating,
      title: title.trim() || `${rating} Star Experience`,
      comment: comment.trim(),
      date: todayStr,
      verifiedPurchase,
      tag,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setCustomerName('');
      setArea('');
      setTitle('');
      setComment('');
      setRating(5);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 z-10 animate-scaleUp max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-[#fafbf7]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#18863c] flex items-center justify-center">
              <Star className="w-5 h-5 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                Write a Customer Review
              </h3>
              <p className="text-xs text-stone-500">
                Share your cooking experience with other home cooks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close review dialog"
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-extrabold text-stone-900">
                Thank You for Your Review!
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Your rating and review has been added and helps our local kitchen team maintain the highest quality standards.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Product / Service <span className="text-red-500">*</span>
                </label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-bold bg-white text-stone-800 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                >
                  <option value="general">⭐ General TAZYO Service &amp; Delivery</option>
                  <optgroup label="Fresh Products">
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.unit})
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.productId && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {errors.productId}
                  </p>
                )}
              </div>

              {/* Star Rating Picker */}
              <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60 text-center">
                <span className="block text-xs font-bold text-amber-900 mb-2">
                  Tap to rate your experience:
                </span>
                <div className="flex justify-center">
                  <RatingStars
                    value={rating}
                    interactive={true}
                    size="lg"
                    showText={true}
                    onChange={(r) => setRating(r)}
                  />
                </div>
                {errors.rating && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {errors.rating}
                  </p>
                )}
              </div>

              {/* Reviewer Name and Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shalini Mehta"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Area / Neighborhood
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Powai, Hiranandani"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Review Headline / Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Review Headline (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cut my cooking prep time in half!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
              </div>

              {/* Detailed Review Text */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Detailed Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How was the freshness, cleanliness of wash, knife cut precision, or delivery speed?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
                />
                {errors.comment && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1">
                    {errors.comment}
                  </p>
                )}
              </div>

              {/* Tag Selection */}
              <div>
                <span className="block text-xs font-bold text-stone-600 mb-1.5">
                  Select a Highlight Tag:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTag(t)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                        tag === t
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-emerald-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Purchase Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="verified_check"
                  checked={verifiedPurchase}
                  onChange={(e) => setVerifiedPurchase(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm border-stone-300 focus:ring-emerald-500"
                />
                <label htmlFor="verified_check" className="text-xs text-stone-600 flex items-center gap-1 font-medium cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>I ordered this from TAZYO WhatsApp delivery</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#18863c] hover:bg-[#136a30] text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-105 cursor-pointer"
                >
                  Submit Review ⭐
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
