'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../src/context/AuthContext';
import { searchCompanies } from '../../../src/api/companies';
import Captcha from '../../../src/components/Captcha';

function RegisterCompanyForm() {
  const { registerCompany } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimingId = searchParams.get('claim');

  const [mode, setMode] = useState(claimingId ? 'claim' : 'new');
  const [claimResults, setClaimResults] = useState([]);
  const [claimQuery, setClaimQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [form, setForm] = useState({ email: '', password: '', companyName: '', industry: '' });
  const [captcha, setCaptcha] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!claimQuery || claimQuery.length < 2) { setClaimResults([]); return; }
    const t = setTimeout(() => {
      searchCompanies({ q: claimQuery, limit: 6 }).then((res) => setClaimResults(res.data));
    }, 300);
    return () => clearTimeout(t);
  }, [claimQuery]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'claim' && !selectedCompany) {
      setError('Select the company listing you want to claim.');
      return;
    }
    setSubmitting(true);
    try {
      await registerCompany({
        email: form.email,
        password: form.password,
        companyName: mode === 'new' ? form.companyName : undefined,
        industry: mode === 'new' ? form.industry : undefined,
        companyId: mode === 'claim' ? selectedCompany.id : undefined,
        ...captcha,
      });
      router.push('/company/verify-pending');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-heading text-2xl font-bold mb-1">Register your company</h1>
      <p className="text-gray-500 text-sm mb-6">
        Already listed on Silver Link from historical SIWES data? Claim your profile instead of creating a duplicate.
      </p>

      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setMode('new')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'new' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
        >
          New company
        </button>
        <button
          type="button"
          onClick={() => setMode('claim')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${mode === 'claim' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
        >
          Claim existing listing
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {mode === 'new' ? (
          <>
            <input
              placeholder="Company name" className="input"
              value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required
            />
            <input
              placeholder="Industry" className="input"
              value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
          </>
        ) : (
          <div>
            <input
              placeholder="Search company by name" className="input"
              value={claimQuery} onChange={(e) => setClaimQuery(e.target.value)}
            />
            {claimResults.length > 0 && (
              <div className="mt-2 border rounded-xl divide-y overflow-hidden">
                {claimResults.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => { setSelectedCompany(c); setClaimQuery(c.name); setClaimResults([]); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50"
                  >
                    {c.name} <span className="text-gray-400">— {c.industry}</span>
                  </button>
                ))}
              </div>
            )}
            {selectedCompany && (
              <p className="text-xs text-green-600 mt-2">Selected: {selectedCompany.name}</p>
            )}
          </div>
        )}

        <input
          type="email" placeholder="Work email address" className="input"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
        />
        <input
          type="password" placeholder="Password (min 6 characters)" className="input" minLength={6}
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
        />

        <Captcha onChange={setCaptcha} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Submitting...' : 'Register company'}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Registering as a student instead?{' '}
        <Link href="/register" className="text-primary font-medium">Go there</Link>
      </p>
    </div>
  );
}

export default function RegisterCompanyPage() {
  return (
    <Suspense fallback={null}>
      <RegisterCompanyForm />
    </Suspense>
  );
}
