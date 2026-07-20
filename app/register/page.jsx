'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';
import Captcha from '../../src/components/Captcha';

const LEVELS = ['100', '200', '300', '400', '500'];

export default function RegisterPage() {
  const { registerStudent } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', faculty: '', department: '', level: '',
  });
  const [captcha, setCaptcha] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await registerStudent({ ...form, ...captcha });
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Create your student profile</h1>
      <p className="text-gray-500 text-sm mb-6">Takes less than two minutes.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input name="fullName" placeholder="Full name" className="input" value={form.fullName} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email address" className="input" value={form.email} onChange={onChange} required />
        <input name="password" type="password" placeholder="Password (min 6 characters)" className="input" value={form.password} onChange={onChange} required minLength={6} />
        <input name="faculty" placeholder="Faculty" className="input" value={form.faculty} onChange={onChange} />
        <input name="department" placeholder="Department (e.g. Computer Science)" className="input" value={form.department} onChange={onChange} />
        <select name="level" className="input" value={form.level} onChange={onChange}>
          <option value="">Select level</option>
          {LEVELS.map((l) => <option key={l} value={l}>{l} Level</option>)}
        </select>

        <Captcha onChange={setCaptcha} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-medium">Log in</Link>
      </p>
    </div>
  );
}
