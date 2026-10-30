export interface UserProfile {
  id: string;
  phone: string;
  name: string;
  address?: string;
  landmark?: string;
  savedAddresses?: Array<{
    id: string;
    label: 'Home' | 'Work' | 'Other';
    address: string;
    landmark?: string;
  }>;
  createdAt: number;
}

export interface OTPState {
  phone: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

export function normalizePhoneNumber(raw: string): string {
  // Strip non-digits
  const cleaned = raw.replace(/\D/g, '');
  // If 12 digits starting with 91, take last 10
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return cleaned.slice(2);
  }
  // If 11 digits starting with 0, take last 10
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return cleaned.slice(1);
  }
  return cleaned;
}

export function isValidIndianMobile(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone);
  // Valid Indian mobile numbers are 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(normalized);
}

export function generateOTP(): string {
  // 4-digit numeric code
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function generateDeliveryOTP(): string {
  // 4-digit code for doorstep delivery confirmation
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function verifyOTP(
  enteredCode: string,
  actualCode: string,
  expiresAt: number
): { success: boolean; error?: string } {
  if (Date.now() > expiresAt) {
    return { success: false, error: 'OTP has expired. Please request a new one.' };
  }
  if (enteredCode.trim() !== actualCode.trim()) {
    return { success: false, error: 'Invalid OTP entered. Please check and try again.' };
  }
  return { success: true };
}
