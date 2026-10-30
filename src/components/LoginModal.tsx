import React, { useState, useEffect } from 'react';
import { X, Phone, ShieldCheck, ArrowRight, RefreshCw, CheckCircle2, User } from 'lucide-react';
import { normalizePhoneNumber, isValidIndianMobile, generateOTP, verifyOTP, UserProfile } from '../utils/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [expiresAt, setExpiresAt] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Countdown timer for resend
  useEffect(() => {
    let timer: any;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = normalizePhoneNumber(phone);
    if (!isValidIndianMobile(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const code = generateOTP();
      setGeneratedOtp(code);
      setExpiresAt(Date.now() + 120000); // 2 minutes expiry
      setStep('otp');
      setCountdown(30);
      setOtp(['', '', '', '']);
      setLoading(false);
    }, 600);
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    const code = generateOTP();
    setGeneratedOtp(code);
    setExpiresAt(Date.now() + 120000);
    setCountdown(30);
    setError('');
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 4) {
      setError('Please enter all 4 digits of the OTP.');
      return;
    }

    const result = verifyOTP(entered, generatedOtp, expiresAt);
    if (!result.success) {
      setError(result.error || 'Invalid OTP code.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const cleanPhone = normalizePhoneNumber(phone);
      const user: UserProfile = {
        id: `user_${cleanPhone}`,
        phone: cleanPhone,
        name: name.trim() || `Customer ${cleanPhone.slice(-4)}`,
        createdAt: Date.now(),
      };
      onLoginSuccess(user);
      setLoading(false);
      onClose();
    }, 500);
  };

  const handleUseDemoOtp = () => {
    if (generatedOtp) {
      const digits = generatedOtp.split('');
      setOtp(digits);
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200 z-10 animate-scaleUp">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-[#fafbf7]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#18863c] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-lg">
                {step === 'phone' ? 'Customer Sign In' : 'Verify Mobile OTP'}
              </h3>
              <p className="text-xs text-stone-500">
                {step === 'phone'
                  ? 'Access doorstep delivery, orders & review benefits'
                  : `OTP sent to +91 ${normalizePhoneNumber(phone)}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Login Dialog"
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label htmlFor="login_phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-bold text-stone-500 pr-2 border-r border-stone-200">
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    id="login_phone"
                    type="tel"
                    required
                    aria-label="Mobile Number for OTP"
                    placeholder="98200XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={13}
                    className="w-full pl-24 pr-4 py-3 bg-stone-50 focus:bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-hidden transition-all"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  We will send a 4-digit verification code to this phone.
                </p>
              </div>

              <div>
                <label htmlFor="login_name" className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                  Your Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login_name"
                    type="text"
                    aria-label="Your Name for Login"
                    placeholder="e.g. Anjali Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 focus:bg-white border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#18863c] hover:bg-[#136a30] text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-60"
              >
                <span>{loading ? 'Sending OTP...' : 'Get Verification OTP'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              {/* Demo Helper Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-emerald-900">Demo SMS Simulator:</span>
                  <p className="text-emerald-700 font-extrabold text-sm tracking-wider">
                    OTP: <span className="underline decoration-wavy">{generatedOtp}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleUseDemoOtp}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>

              {/* 4 Digit Boxes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 text-center uppercase tracking-wide mb-2.5">
                  Enter 4-Digit Verification Code:
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otp[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      autoFocus={idx === 0}
                      className="w-12 h-14 text-center text-xl font-black bg-stone-50 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-200 outline-hidden transition-all text-stone-900"
                    />
                  ))}
                </div>
              </div>

              {/* Resend and change phone */}
              <div className="flex items-center justify-between text-xs font-semibold pt-1">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Change Number
                </button>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={countdown > 0}
                  className={`flex items-center gap-1 cursor-pointer ${
                    countdown > 0
                      ? 'text-stone-400 cursor-not-allowed'
                      : 'text-emerald-700 hover:text-emerald-800'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>
                    {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                  </span>
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#18863c] hover:bg-[#136a30] text-white font-extrabold text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{loading ? 'Verifying...' : 'Verify OTP & Log In'}</span>
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-5 text-center text-[11px] text-stone-400">
            🔒 By continuing, you agree to receive order status and delivery updates via WhatsApp and SMS from TAZYO.
          </div>
        </div>

      </div>
    </div>
  );
};
