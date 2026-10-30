import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePhoneNumber,
  isValidIndianMobile,
  generateOTP,
  generateDeliveryOTP,
  verifyOTP
} from './auth';

test('normalizePhoneNumber strips country code and symbols', () => {
  assert.equal(normalizePhoneNumber('+91 98200 12345'), '9820012345');
  assert.equal(normalizePhoneNumber('09820012345'), '9820012345');
  assert.equal(normalizePhoneNumber('9820012345'), '9820012345');
});

test('isValidIndianMobile validates 10-digit Indian numbers starting with 6-9', () => {
  assert.equal(isValidIndianMobile('9820012345'), true);
  assert.equal(isValidIndianMobile('+91 7845188778'), true);
  assert.equal(isValidIndianMobile('1234567890'), false); // starts with 1
  assert.equal(isValidIndianMobile('98200'), false); // too short
});

test('generateOTP generates 4 digit numeric string', () => {
  const otp = generateOTP();
  assert.equal(otp.length, 4);
  assert.match(otp, /^\d{4}$/);
});

test('generateDeliveryOTP generates 4 digit code', () => {
  const deliveryOtp = generateDeliveryOTP();
  assert.equal(deliveryOtp.length, 4);
  assert.match(deliveryOtp, /^\d{4}$/);
});

test('verifyOTP validates matching code and catches expiry', () => {
  const future = Date.now() + 60000;
  const past = Date.now() - 1000;

  const valid = verifyOTP('4829', '4829', future);
  assert.equal(valid.success, true);

  const mismatch = verifyOTP('1111', '4829', future);
  assert.equal(mismatch.success, false);
  assert.match(mismatch.error || '', /Invalid OTP/);

  const expired = verifyOTP('4829', '4829', past);
  assert.equal(expired.success, false);
  assert.match(expired.error || '', /expired/);
});
