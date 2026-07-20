'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getMyCompany, updateMyCompany, updateMyDepartments, updateMyStatus, uploadMyLogo, getMyViewStats,
} from '../../../src/api/company';
import { useAuth } from '../../../src/context/AuthContext';
import LoadingScreen from '../../../src/components/LoadingScreen';
import ProtectedRoute from '../../../src/components/ProtectedRoute';

const STATUS_OPTIONS = [
  { value: 'currently_accepting', label: 'Currently Accepting' },
  { value: 'pending_confirmation', label: 'Pending Confirmation' },
  { value: 'applications_closed', label: 'Applications Closed' },
  { value: 'historical_listing', label: 'Historical Listing' },
];

const LISTING_TYPES = [
  { value: 'siwes', label: 'SIWES' },
  { value: 'internship', label: 'Internship' },
  { value: 'graduate', label: 'Graduate Programme' },
];

function CompanyDashboardContent() {
  const { refreshMe } = useAuth();
  const [company, setCompany] = useState(null);
  const [viewStats, setViewStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [deptInput, setDeptInput] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([getMyCompany(), getMyViewStats()])
      .then(([companyRes, statsRes]) => {
        setCompany(companyRes.data);
        setViewStats(statsRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const flash = (msg) => { setMessage(msg); setTimeout(() => setMessage(''), 2500); };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateMyCompany({
        description: company.description,
        website: company.website,
        address: company.address,
        available_slots: company.available_slots,
        listing_type: company.listing_type,
      });
      flash('Profile saved');
    } finally {
      setSaving(false);
    }
  };

  const onStatusChange = async (status) => {
    const res = await updateMyStatus(status);
    setCompany({ ...company, status: res.data.status });
    flash('Status updated');
  };

  const addDepartment = async () => {
    if (!deptInput.trim()) return;
    const next = [...new Set([...(company.departments || []), deptInput.trim()])];
    const res = await updateMyDepartments(next);
    setCompany({ ...company, departments: res.data });
    setDeptInput('');
  };

  const removeDepartment = async (dept) => {
    const next = (company.departments || []).filter((d) => d !== dept);
    const res = await updateMyDepartments(next);
    setCompany({ ...company, departments: res.data });
  };

  const onLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await uploadMyLogo(file);
    setCompany({ ...company, logo_url: res.data.logo_url });
    refreshMe();
    flash('Logo updated');
  };

  if (loading) return <LoadingScreen label="Loading dashboard..." />;
  if (!company) return <p className="text-center text-gray-400 py-16">No company profile found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold">{company.name}</h1>
          <p className="text-sm text-gray-400 mt-1">
            {company.is_verified ? (
              <span className="text-green-600">Verified ✓</span>
            ) : (
              <span className="text-yellow-600">Pending verification — check your email</span>
            )}
          </p>
        </div>
        <Link href="/company/applications" className="btn-primary text-sm py-2">View applications →</Link>
      </div>

      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

      {viewStats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card text-center">
            <p className="text-xl font-heading font-bold text-primary">{viewStats.views_last_7_days}</p>
            <p className="text-xs text-gray-400 mt-1">Views this week</p>
          </div>
          <div className="card text-center">
            <p className="text-xl font-heading font-bold text-primary">{viewStats.views_last_30_days}</p>
            <p className="text-xs text-gray-400 mt-1">Views this month</p>
          </div>
          <div className="card text-center">
            <p className="text-xl font-heading font-bold text-primary">{viewStats.views_all_time}</p>
            <p className="text-xs text-gray-400 mt-1">All-time views</p>
          </div>
        </div>
      )}

      <div className="card mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center relative">
          {company.logo_url ? (
            <Image src={company.logo_url} alt="Logo" fill className="object-cover" sizes="64px" />
          ) : (
            <span className="text-primary font-heading font-bold text-xl">{company.name[0]}</span>
          )}
        </div>
        <div>
          <label htmlFor="logo-upload" className="text-sm font-medium text-primary cursor-pointer">
            Upload logo
          </label>
          <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="font-heading font-semibold mb-3">Application status</h2>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onStatusChange(s.value)}
              className={`px-3 py-2 rounded-lg text-sm border ${
                company.status === s.value ? 'bg-primary text-white border-primary' : 'text-gray-600'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={saveProfile} className="card mb-6 space-y-3">
        <h2 className="font-heading font-semibold mb-1">Company profile</h2>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Listing type</label>
          <div className="flex gap-2">
            {LISTING_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setCompany({ ...company, listing_type: t.value })}
                className={`px-3 py-1.5 rounded-lg text-xs border ${
                  company.listing_type === t.value ? 'bg-primary text-white border-primary' : 'text-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <textarea
          placeholder="Description" className="input min-h-[90px]"
          value={company.description || ''}
          onChange={(e) => setCompany({ ...company, description: e.target.value })}
        />
        <input
          placeholder="Website" className="input"
          value={company.website || ''}
          onChange={(e) => setCompany({ ...company, website: e.target.value })}
        />
        <input
          placeholder="Address" className="input"
          value={company.address || ''}
          onChange={(e) => setCompany({ ...company, address: e.target.value })}
        />
        <input
          type="number" min="0" placeholder="Available slots" className="input"
          value={company.available_slots || 0}
          onChange={(e) => setCompany({ ...company, available_slots: Number(e.target.value) })}
        />
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving...' : 'Save profile'}
        </button>
      </form>

      <div className="card">
        <h2 className="font-heading font-semibold mb-3">Accepted departments</h2>
        <div className="flex gap-2 mb-3">
          <input
            placeholder="e.g. Computer Science" className="input"
            value={deptInput} onChange={(e) => setDeptInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDepartment())}
          />
          <button type="button" onClick={addDepartment} className="btn-primary shrink-0">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(company.departments || []).map((d) => (
            <span key={d} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
              {d}
              <button type="button" onClick={() => removeDepartment(d)} className="text-primary/60 hover:text-primary">×</button>
            </span>
          ))}
          {(!company.departments || company.departments.length === 0) && (
            <p className="text-sm text-gray-400">No departments added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CompanyDashboardPage() {
  return (
    <ProtectedRoute roles={['company']}>
      <CompanyDashboardContent />
    </ProtectedRoute>
  );
}
