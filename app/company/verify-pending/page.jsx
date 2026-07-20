'use client';

import { useState } from 'react';
import { resendCompanyVerification } from '../../../src/api/auth';

export default function VerifyPendingPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const resend = async () => {
    setError('');
    try {
      await resendCompanyVerification();
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not resend the email right now.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="font-heading text-2xl font-bold mb-3">Check your inbox</h1>
      <p className="text-gray-500">
        We sent a verification link to your work email. Click it to unlock your company dashboard.
      </p>
      <button type="button" onClick={resend} className="btn-primary mt-6">
        Resend verification email
      </button>
      {sent && <p className="text-sm text-green-600 mt-3">Verification email sent again.</p>}
      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
    </div>
  );
}
