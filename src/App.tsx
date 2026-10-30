import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProductCatalog } from './components/ProductCatalog';
import { HygieneProcess } from './components/HygieneProcess';
import { QuickOrderForm } from './components/QuickOrderForm';
import { QRCodeSection } from './components/QRCodeSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReviewModal } from './components/ReviewModal';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';
import { UserProfileDrawer } from './components/UserProfileDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartItem, Product, CutOption, ProductReview, OrderDetails } from './types';
import { INITIAL_REVIEWS } from './data/reviews';
import { UserProfile } from './utils/auth';
import { calculateSubtotal } from './utils/order';

const CART_STORAGE_KEY = 'tazyo_cart_items_v1';
const REVIEWS_STORAGE_KEY = 'tazyo_reviews_v1';
const USER_STORAGE_KEY = 'tazyo_user_profile_v1';

export default function App() {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore JSON error
    }
    return [];
  });

  // User Profile State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return null;
  });

  // Reviews State
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_REVIEWS;
  });

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewModalProductId, setReviewModalProductId] = useState<string>('general');
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>('all');
  
  // Confirmed Order with Delivery OTP
  const [confirmedOrder, setConfirmedOrder] = useState<{
    deliveryOtp: string;
    whatsappUrl: string;
    cartItems: CartItem[];
    orderDetails: OrderDetails;
    totalAmount: number;
  } | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch {}
  }, [user]);

  // Cart Handlers
  const handleAddToCart = (product: Product, cut?: CutOption) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedCut === cut
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedCut: cut }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number, cut?: CutOption) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter(
          (item) => !(item.product.id === productId && item.selectedCut === cut)
        );
      }
      return prev.map((item) => {
        if (item.product.id === productId && item.selectedCut === cut) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const handleRemoveItem = (productId: string, cut?: CutOption) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedCut === cut))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Auth Handlers
  const handleLoginSuccess = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateAddress = (address: string, landmark?: string) => {
    if (!user) return;
    setUser({
      ...user,
      address,
      landmark,
    });
  };

  // Review Handlers
  const handleOpenReviewModal = (productId?: string) => {
    setReviewModalProductId(productId || 'general');
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (
    newRevData: Omit<ProductReview, 'id' | 'timestamp' | 'helpfulCount'>
  ) => {
    const newReview: ProductReview = {
      ...newRevData,
      id: `rev_${Date.now()}`,
      timestamp: Date.now(),
      helpfulCount: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleHelpfulClick = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    );
  };

  const handleSelectProductReviews = (productId: string) => {
    setSelectedReviewFilter(productId);
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = calculateSubtotal(cartItems);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf7] text-[#1b261b]">
      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExploreProducts={handleExploreProducts} />

        {/* Why Choose TAZYO Features */}
        <ServicesSection />

        {/* Products Catalog with Star Ratings */}
        <ProductCatalog
          cartItems={cartItems}
          reviews={reviews}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectProductReviews={handleSelectProductReviews}
          onWriteProductReview={handleOpenReviewModal}
        />

        {/* 4-Step Clean Wash & Hygiene Story */}
        <HygieneProcess />

        {/* Quick Custom Shopping List Form */}
        <QuickOrderForm />

        {/* Dedicated Customer Reviews & Ratings Section */}
        <ReviewsSection
          reviews={reviews}
          onOpenReviewModal={handleOpenReviewModal}
          onHelpfulClick={handleHelpfulClick}
          selectedProductFilter={selectedReviewFilter}
          onProductFilterChange={setSelectedReviewFilter}
        />

        {/* WhatsApp QR Code Scan Card */}
        <QRCodeSection />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        user={user}
        onOpenLogin={() => {
          setIsCartOpen(false);
          setIsLoginOpen(true);
        }}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={(orderData) => {
          setConfirmedOrder(orderData);
          setCartItems([]); // Clear bag after order
        }}
      />

      {/* Customer Login & Phone OTP Verification Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Customer Profile & Address Drawer */}
      <UserProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
        onUpdateAddress={handleUpdateAddress}
      />

      {/* Doorstep Delivery OTP Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal
          isOpen={true}
          onClose={() => setConfirmedOrder(null)}
          deliveryOtp={confirmedOrder.deliveryOtp}
          whatsappUrl={confirmedOrder.whatsappUrl}
          cartItems={confirmedOrder.cartItems}
          orderDetails={confirmedOrder.orderDetails}
          totalAmount={confirmedOrder.totalAmount}
        />
      )}

      {/* Write a Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
        defaultProductId={reviewModalProductId}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
