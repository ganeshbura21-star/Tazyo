import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProductRating,
  filterAndSortReviews,
  validateReview
} from './reviews';
import { ProductReview } from '../types';

const sampleReviews: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'cut-sambar-mix',
    productName: 'Sambar Special Veggies Mix',
    customerName: 'Sunita M.',
    area: 'Powai',
    rating: 5,
    title: 'Huge time saver',
    comment: 'The chunks of drumstick and pumpkin are so fresh and evenly cut!',
    date: 'Oct 28, 2026',
    timestamp: 1729000000000,
    verifiedPurchase: true,
    helpfulCount: 4,
  },
  {
    id: 'rev-2',
    productId: 'cut-sambar-mix',
    productName: 'Sambar Special Veggies Mix',
    customerName: 'Rajesh K.',
    area: 'Andheri',
    rating: 4,
    title: 'Very fresh',
    comment: 'Great quality, vegetables were crisp and good portion for 4.',
    date: 'Oct 25, 2026',
    timestamp: 1728000000000,
    verifiedPurchase: true,
    helpfulCount: 1,
  },
  {
    id: 'rev-3',
    productId: 'wash-spinach',
    productName: 'Ozone-Washed Baby Spinach',
    customerName: 'Kavita S.',
    area: 'Bandra',
    rating: 5,
    title: 'Zero grit!',
    comment: 'Usually washing palak takes forever. TAZYO palak is 100% clean.',
    date: 'Oct 29, 2026',
    timestamp: 1730000000000,
    verifiedPurchase: true,
    helpfulCount: 9,
  },
  {
    id: 'rev-4',
    productId: 'cut-diced-onions',
    productName: 'Crying-Free Diced Red Onions',
    customerName: 'Vikram D.',
    area: 'Malad',
    rating: 3,
    title: 'Convenient but small box',
    comment: 'Fresh onions, wished the pack was slightly bigger.',
    date: 'Oct 20, 2026',
    timestamp: 1727000000000,
    verifiedPurchase: true,
    helpfulCount: 0,
  }
];

test('calculateProductRating computes overall average and breakdown for all reviews', () => {
  // Total: 5 + 4 + 5 + 3 = 17 / 4 = 4.25 -> 4.3 rounded to 1 decimal
  const stats = calculateProductRating(sampleReviews);
  assert.equal(stats.count, 4);
  assert.equal(stats.average, 4.3);
  assert.equal(stats.breakdown[5], 2);
  assert.equal(stats.breakdown[4], 1);
  assert.equal(stats.breakdown[3], 1);
  assert.equal(stats.percentBreakdown[5], 50);
});

test('calculateProductRating computes specific product stats', () => {
  // Sambar mix has two reviews: 5 and 4 -> avg: 4.5
  const stats = calculateProductRating(sampleReviews, 'cut-sambar-mix');
  assert.equal(stats.count, 2);
  assert.equal(stats.average, 4.5);
  assert.equal(stats.breakdown[5], 1);
  assert.equal(stats.breakdown[4], 1);
  assert.equal(stats.breakdown[3], 0);
});

test('filterAndSortReviews filters by product and rating and sorts by helpful', () => {
  const filtered = filterAndSortReviews(sampleReviews, {
    productId: 'cut-sambar-mix',
  });
  assert.equal(filtered.length, 2);

  const fiveStarsOnly = filterAndSortReviews(sampleReviews, {
    ratingFilter: 5,
  });
  assert.equal(fiveStarsOnly.length, 2);

  const sortedHelpful = filterAndSortReviews(sampleReviews, {
    sortBy: 'helpful',
  });
  assert.equal(sortedHelpful[0].id, 'rev-3'); // 9 helpful votes
});

test('validateReview checks required fields and lengths', () => {
  const invalid = validateReview({
    customerName: '',
    rating: 0,
    comment: 'hi',
    productId: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.rating);
  assert.ok(invalid.errors.comment);
  assert.ok(invalid.errors.productId);

  const valid = validateReview({
    customerName: 'Aarav Patel',
    rating: 5,
    comment: 'Exceptional cut and fresh veggies!',
    productId: 'cut-sambar-mix',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
