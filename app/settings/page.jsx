'use client';

import { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import api from '../../src/api/client';
import ProtectedRoute from '../../src/components/ProtectedRoute';

function SettingsContent() {
  const { user } = useAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);
    try {
      await api.post('/auth/change-password', form);
      setMessage('Password updated.');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Account settings</h1>
      <p className="text-gray-500 text-sm mb-6">{user?.email}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="password" placeholder="Current password" className="input"
          value={form.currentPassword}
          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          required
        />
        <input
          type="password" placeholder="New password (min 6 characters)" className="input" minLength={6}
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          required
        />

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Updating...' : 'Update password'}
        </button>
      </form>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}
