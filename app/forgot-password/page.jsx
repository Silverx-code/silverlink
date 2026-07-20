'use client';

import { useState } from 'react';
import Link from 'next/link';
import api from '../../src/api/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-3">Check your inbox</h1>
        <p className="text-gray-500">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent a link to reset your password.
          It expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Forgot your password?</h1>
      <p className="text-gray-500 text-sm mb-6">We&apos;ll email you a link to reset it.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email" placeholder="Email address" className="input"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Sending...' : 'Send reset link'}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        <Link href="/login" className="text-primary font-medium">Back to log in</Link>
      </p>
    </div>
  );
}
