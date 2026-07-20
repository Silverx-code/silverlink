'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/api/client';
import { findOrCreateLocation } from '../../../src/api/locations';
import { uploadMyCv } from '../../../src/api/applications';
import ProtectedRoute from '../../../src/components/ProtectedRoute';

const LEVELS = ['100', '200', '300', '400', '500'];

function StudentProfileContent() {
  const { profile, refreshMe } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    department: profile?.department || '',
    level: profile?.level || '',
    faculty: profile?.faculty || '',
    preferredState: profile?.preferred_state || '',
    preferredCity: profile?.preferred_city || '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      let preferredLocationId;
      if (form.preferredState && form.preferredCity) {
        const locRes = await findOrCreateLocation(form.preferredState, form.preferredCity);
        preferredLocationId = locRes.data.id;
      }

      await api.patch('/students/me', {
        department: form.department,
        level: form.level,
        faculty: form.faculty,
        preferred_location_id: preferredLocationId,
      });

      if (cvFile) {
        await uploadMyCv(cvFile);
      }

      await refreshMe();
      setMessage('Profile updated.');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save your profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Complete your profile</h1>
      <p className="text-gray-500 text-sm mb-6">
        This is what powers your recommendations and what companies see when you apply.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          placeholder="Department (e.g. Computer Science)" className="input"
          value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
        />
        <input
          placeholder="Faculty" className="input"
          value={form.faculty} onChange={(e) => setForm({ ...form, faculty: e.target.value })}
        />
        <select
          className="input" value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option value="">Select level</option>
          {LEVELS.map((l) => <option key={l} value={l}>{l} Level</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Preferred state" className="input"
            value={form.preferredState} onChange={(e) => setForm({ ...form, preferredState: e.target.value })}
          />
          <input
            placeholder="Preferred city" className="input"
            value={form.preferredCity} onChange={(e) => setForm({ ...form, preferredCity: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="cv-upload" className="text-sm font-medium text-primary cursor-pointer">
            {cvFile ? cvFile.name : profile?.cv_url ? 'Replace CV' : 'Upload CV'}
          </label>
          <input
            id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden"
            onChange={(e) => setCvFile(e.target.files[0])}
          />
        </div>

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}

export default function StudentProfilePage() {
  return (
    <ProtectedRoute roles={['student']}>
      <StudentProfileContent />
    </ProtectedRoute>
  );
}
