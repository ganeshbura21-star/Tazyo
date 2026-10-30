import { ProductReview } from '../types';

export interface RatingStats {
  average: number;
  count: number;
  breakdown: Record<number, number>; // 5: count, 4: count, etc.
  percentBreakdown: Record<number, number>; // 5: percentage, etc.
}

export function calculateProductRating(
  reviews: ProductReview[],
  productId?: string
): RatingStats {
  const relevant = productId
    ? reviews.filter((r) => r.productId === productId)
    : reviews;

  const count = relevant.length;
  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const percentBreakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  if (count === 0) {
    return {
      average: 0,
      count: 0,
      breakdown,
      percentBreakdown,
    };
  }

  let sum = 0;
  for (const r of relevant) {
    const star = Math.max(1, Math.min(5, Math.round(r.rating)));
    breakdown[star] = (breakdown[star] || 0) + 1;
    sum += r.rating;
  }

  for (let star = 1; star <= 5; star++) {
    percentBreakdown[star] = Math.round((breakdown[star] / count) * 100);
  }

  const average = Number((sum / count).toFixed(1));

  return {
    average,
    count,
    breakdown,
    percentBreakdown,
  };
}

export interface ReviewFilterOptions {
  productId?: string;
  ratingFilter?: number; // 0 or undefined means all
  sortBy?: 'recent' | 'highest' | 'lowest' | 'helpful';
  searchQuery?: string;
}

export function filterAndSortReviews(
  reviews: ProductReview[],
  options: ReviewFilterOptions = {}
): ProductReview[] {
  const { productId, ratingFilter, sortBy = 'recent', searchQuery } = options;

  let result = reviews.filter((r) => {
    if (productId && productId !== 'all' && r.productId !== productId) {
      return false;
    }
    if (ratingFilter && ratingFilter > 0 && Math.round(r.rating) !== ratingFilter) {
      return false;
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchComment = r.comment.toLowerCase().includes(q);
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchName = r.customerName.toLowerCase().includes(q);
      const matchProduct = r.productName.toLowerCase().includes(q);
      if (!matchComment && !matchTitle && !matchName && !matchProduct) {
        return false;
      }
    }
    return true;
  });

  return result.sort((a, b) => {
    if (sortBy === 'highest') {
      return b.rating - a.rating || b.timestamp - a.timestamp;
    }
    if (sortBy === 'lowest') {
      return a.rating - b.rating || b.timestamp - a.timestamp;
    }
    if (sortBy === 'helpful') {
      return (b.helpfulCount || 0) - (a.helpfulCount || 0) || b.timestamp - a.timestamp;
    }
    // Default: 'recent'
    return b.timestamp - a.timestamp;
  });
}

export function validateReview(data: {
  customerName?: string;
  rating?: number;
  comment?: string;
  productId?: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.customerName || !data.customerName.trim()) {
    errors.customerName = 'Please enter your name.';
  } else if (data.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Please choose a rating between 1 and 5 stars.';
  }

  if (!data.comment || !data.comment.trim()) {
    errors.comment = 'Please provide review feedback.';
  } else if (data.comment.trim().length < 5) {
    errors.comment = 'Review feedback must be at least 5 characters.';
  }

  if (!data.productId || !data.productId.trim()) {
    errors.productId = 'Please select a product or general service.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
