'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../../src/api/client';

export default function ResetPasswordPage({ params }) {
  const { token } = params;
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'This reset link is invalid or has expired.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold mb-3">Password updated ✓</h1>
        <p className="text-gray-500">Redirecting you to log in...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Choose a new password</h1>
      <p className="text-gray-500 text-sm mb-6">Must be at least 6 characters.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="password" placeholder="New password" className="input" minLength={6}
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Updating...' : 'Update password'}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        <Link href="/login" className="text-primary font-medium">Back to log in</Link>
      </p>
    </div>
  );
}
