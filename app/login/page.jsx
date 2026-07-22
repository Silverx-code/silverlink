'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(form);
      if (user.role === 'company') router.push('/company/dashboard');
      else if (user.role === 'admin') router.push('/admin');
      else if (user.role === 'coordinator') router.push('/university/dashboard');
      else router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Welcome back</h1>
      <p className="text-gray-500 text-sm mb-6">Log in to continue your SIWES search.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="text-sm text-center mt-3">
        <Link href="/forgot-password" className="text-gray-400 hover:text-primary">Forgot your password?</Link>
      </p>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary font-medium">Create one</Link>
      </p>
    </div>
  );
}
