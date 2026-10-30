import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, MessageCircle, Star, MessageSquare } from 'lucide-react';
import { Product, ProductCategory, CutOption, CartItem, ProductReview } from '../types';
import { PRODUCTS, TAZYO_RAW_PHONE } from '../data/products';
import { calculateProductRating } from '../utils/reviews';

interface ProductCatalogProps {
  cartItems: CartItem[];
  reviews: ProductReview[];
  onAddToCart: (product: Product, cut?: CutOption) => void;
  onUpdateQuantity: (productId: string, quantity: number, cut?: CutOption) => void;
  onOpenCart: () => void;
  onSelectProductReviews: (productId: string) => void;
  onWriteProductReview: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  cartItems,
  reviews,
  onAddToCart,
  onUpdateQuantity,
  onOpenCart,
  onSelectProductReviews,
  onWriteProductReview,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuts, setSelectedCuts] = useState<Record<string, CutOption>>({});

  const categories: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Offerings', icon: '🧺' },
    { id: 'cut-ready', label: 'Cut: Ready to Cook', icon: '🔪' },
    { id: 'fresh-wash', label: 'Sanitized Clean Wash', icon: '🚿' },
    { id: 'daily-veggies', label: 'Daily Vegetables', icon: '🥕' },
    { id: 'fruits', label: 'Seasonal Fruits', icon: '🍎' },
    { id: 'combos', label: 'Meal Prep Combos', icon: '🥗' },
  ];

  const handleCutChange = (productId: string, cut: CutOption) => {
    setSelectedCuts((prev) => ({ ...prev, [productId]: cut }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        (product.hindiName && product.hindiName.toLowerCase().includes(q)) ||
        product.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="products" className="py-16 bg-[#fafbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#18863c] text-xs font-extrabold uppercase tracking-wider mb-2">
            <span>Farm Direct &amp; Kitchen Ready</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b261b] tracking-tight">
            Our Fresh Offerings
          </h2>
          <p className="text-[#586756] text-base mt-2">
            Select items with your preferred cut style, check customer reviews, or order directly to WhatsApp!
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search veggies, fruits, Hindi name (पालक, सांभर, भिंडी)..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-stone-200 bg-white shadow-xs focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-medium outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#18863c] text-white shadow-md shadow-emerald-700/20'
                      : 'bg-white hover:bg-emerald-50 text-stone-700 border border-stone-200 hover:border-emerald-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-stone-800 mt-3">No matching produce found</h3>
            <p className="text-sm text-stone-500 mt-1">
              Looking for something custom? Type your items in the Quick Order form below or tell us on WhatsApp!
            </p>
            <a
              href="#quick-order"
              className="inline-block mt-4 text-sm font-bold text-emerald-700 hover:underline"
            >
              Go to Quick Order Form →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const currentCut = selectedCuts[product.id] || (product.cutOptions ? product.cutOptions[0] : undefined);
              const inCartItem = cartItems.find(
                (ci) => ci.product.id === product.id && ci.selectedCut === currentCut
              );
              const quantityInCart = inCartItem ? inCartItem.quantity : 0;

              // Product rating calculations
              const productRating = calculateProductRating(reviews, product.id);
              const displayRating = productRating.count > 0 ? productRating.average : 5.0;

              // Pre-encoded direct WhatsApp message for this item
              const directWaMsg = encodeURIComponent(
                `Hi TAZYO! I want to order:\n• *${product.name}* (${product.unit})${currentCut ? ` [${currentCut}]` : ''} - ₹${product.price}\n\nPlease confirm delivery availability!`
              );

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e6eee2] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-white/90 backdrop-blur-xs text-emerald-800 shadow-sm border border-emerald-100">
                        {product.badge}
                      </span>
                    )}

                    {/* Average Rating Badge on Top Right */}
                    <button
                      type="button"
                      onClick={() => onSelectProductReviews(product.id)}
                      title="View reviews for this product"
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-black bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs shadow-sm flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{displayRating}</span>
                      <span className="text-stone-300 text-[10px]">
                        ({productRating.count})
                      </span>
                    </button>

                    {/* Shelf Life tag */}
                    {product.shelfLife && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                        Fresh {product.shelfLife}
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Header: Name and Hindi Name */}
                    <div className="mb-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-extrabold text-[#1b261b] text-base leading-snug">
                          {product.name}
                        </h3>
                      </div>
                      {product.hindiName && (
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                          {product.hindiName}
                        </p>
                      )}
                    </div>

                    {/* Interactive Rating Strip */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <button
                        type="button"
                        onClick={() => onSelectProductReviews(product.id)}
                        className="flex items-center gap-1 text-stone-600 hover:text-emerald-700 font-semibold cursor-pointer"
                      >
                        <div className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        </div>
                        <span className="font-extrabold text-stone-900">{displayRating}</span>
                        <span className="text-stone-500 underline text-[11px]">
                          ({productRating.count} reviews)
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onWriteProductReview(product.id)}
                        className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Review</span>
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#586756] leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Cut Option Selector if available */}
                    {product.cutOptions && product.cutOptions.length > 1 && (
                      <div className="mb-3 p-2 rounded-xl bg-[#fafbf7] border border-[#e6eee2]">
                        <label className="block text-[11px] font-bold text-stone-600 mb-1 flex items-center gap-1">
                          <span>🔪 Cut Preference:</span>
                        </label>
                        <select
                          value={currentCut}
                          onChange={(e) => handleCutChange(product.id, e.target.value as CutOption)}
                          className="w-full text-xs font-semibold bg-white border border-stone-200 rounded-lg px-2 py-1 text-stone-800 focus:outline-hidden focus:border-emerald-500"
                        >
                          {product.cutOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Price and Unit */}
                    <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-extrabold text-[#18863c]">₹{product.price}</span>
                          <span className="text-xs font-medium text-stone-500">/ {product.unit}</span>
                        </div>
                      </div>

                      {/* Direct WhatsApp Quick Link */}
                      <a
                        href={`https://wa.me/${TAZYO_RAW_PHONE}?text=${directWaMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                        title="Order this directly on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Direct WA</span>
                      </a>
                    </div>

                    {/* Quantity or Add Button */}
                    {quantityInCart > 0 ? (
                      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantityInCart - 1, currentCut)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="w-8 h-8 rounded-lg bg-white text-emerald-700 font-extrabold flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-extrabold text-emerald-900 px-3">
                          {quantityInCart} in bag
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantityInCart + 1, currentCut)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="w-8 h-8 rounded-lg bg-[#18863c] text-white font-extrabold flex items-center justify-center hover:bg-[#136a30] transition-colors shadow-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(product, currentCut)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#18863c] hover:bg-[#136a30] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </button>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner to Checkout */}
        {cartItems.length > 0 && (
          <div className="mt-12 p-4 sm:p-6 bg-gradient-to-r from-emerald-800 to-green-900 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
                🧺
              </div>
              <div>
                <p className="text-lg font-bold">
                  You have {cartItems.reduce((acc, i) => acc + i.quantity, 0)} fresh item(s) in your bag
                </p>
                <p className="text-xs text-emerald-200">
                  Ready to send your formatted list to TAZYO WhatsApp for doorstep delivery!
                </p>
              </div>
            </div>
            <button
              onClick={onOpenCart}
              className="px-6 py-3 rounded-full bg-[#f36c21] hover:bg-[#e05a10] text-white font-black text-sm shadow-lg shadow-orange-900/30 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <span>View Bag &amp; Get Delivery OTP</span>
              <span>→</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
