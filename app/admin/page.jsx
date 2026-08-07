'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  getStats, getAnalytics, getPendingCompanies, verifyCompanyManually,
  getUnmoderatedReviews, moderateReview, getUniversities, createUniversity, createCoordinator,
} from '../../src/api/admin';
import LoadingScreen from '../../src/components/LoadingScreen';
import ProtectedRoute from '../../src/components/ProtectedRoute';
import AdminAddCompanyForm from '../../src/components/AdminAddCompanyForm';
import AdminCompaniesPanel from '../../src/components/AdminCompaniesPanel';
import AdminUsersPanel from '../../src/components/AdminUsersPanel';
import AdminScraperPanel from '../../src/components/AdminScraperPanel';

function AdminDashboardContent() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [pending, setPending] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [uniForm, setUniForm] = useState({ name: '', state: '' });
  const [coordForm, setCoordForm] = useState({
    email: '', password: '', fullName: '', universityId: '', title: '',
  });
  const [message, setMessage] = useState('');

  const load = () => {
    setLoading(true);
    Promise.all([
      getStats(), getAnalytics(), getPendingCompanies(), getUnmoderatedReviews(), getUniversities(),
    ]).then(([statsRes, analyticsRes, pendingRes, reviewsRes, uniRes]) => {
      setStats(statsRes.data);
      setAnalytics(analyticsRes.data);
      setPending(pendingRes.data);
      setReviews(reviewsRes.data);
      setUniversities(uniRes.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const flash = (msg) => { setMessage(msg); setTimeout(() => setMessage(''), 2500); };

  const verify = async (id) => {
    await verifyCompanyManually(id);
    setPending((prev) => prev.filter((c) => c.id !== id));
  };

  const handleReview = async (id, action) => {
    await moderateReview(id, action);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const addUniversity = async (e) => {
    e.preventDefault();
    const res = await createUniversity(uniForm);
    setUniversities((prev) => [...prev, res.data]);
    setUniForm({ name: '', state: '' });
    flash('University added');
  };

  const addCoordinator = async (e) => {
    e.preventDefault();
    await createCoordinator(coordForm);
    setCoordForm({
      email: '', password: '', fullName: '', universityId: '', title: '',
    });
    flash('Coordinator account created');
  };

  if (loading) return <LoadingScreen label="Loading admin dashboard..." />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 rounded-[2rem] border border-primary/10 bg-white/70 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
        <p className="eyebrow">Operations control</p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-ink dark:text-slate-50">Admin</h1>
        <p className="mt-2 text-sm text-silver-dark dark:text-slate-400">Manage placement growth, verification, and network quality from one place.</p>
      </div>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats && Object.entries(stats).map(([key, value]) => (
          <div key={key} className="card text-center">
            <p className="text-2xl font-heading font-bold text-primary">{value}</p>
            <p className="mt-1 text-xs capitalize text-gray-400 dark:text-slate-400">{key.replace(/([A-Z])/g, ' $1')}</p>
          </div>
        ))}
      </div>

      {analytics && (
        <div className="card mb-10">
          <h2 className="font-heading text-lg font-semibold mb-4">Applications, last 6 months</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analytics.applicationsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <h3 className="font-heading font-semibold text-sm mt-6 mb-3">Top companies by applications</h3>
          <div className="space-y-2">
            {analytics.topCompanies.map((c) => (
              <div key={c.id} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span>{c.name}</span>
                <span className="text-gray-400">{c.application_count} applications · ★ {c.avg_rating}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-heading text-lg font-semibold mb-3">Pending company verification</h2>
      {pending.length === 0 ? (
        <p className="text-gray-400 text-sm mb-10">Nothing pending — all companies are verified.</p>
      ) : (
        <div className="space-y-3 mb-10">
          {pending.map((c) => (
            <div key={c.id} className="card flex items-center justify-between">
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-400">{c.industry} · {c.verification_email || c.account_email}</p>
              </div>
              <button type="button" onClick={() => verify(c.id)} className="btn-primary text-sm py-2">
                Verify
              </button>
              <button
  type="button"
  onClick={async () => {
    try {
      const res = await getCompanyVerificationLink(c.id);
      await navigator.clipboard.writeText(res.data.url);
      flash(`Link copied for ${c.name} — paste it into an email or message.`);
    } catch (err) {
      alert(err.response?.data?.message || 'Could not generate a link right now.');
    }
  }}
  className="text-sm border border-primary text-primary px-3 py-2 rounded-xl"
>
  Copy verification link
</button>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-heading text-lg font-semibold mb-3">Reviews awaiting moderation</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-sm mb-10">No reviews waiting for moderation.</p>
      ) : (
        <div className="space-y-3 mb-10">
          {reviews.map((r) => (
            <div key={r.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{r.student_name} → {r.company_name}</p>
                  <p className="text-sm text-gray-500 mt-1">★ {r.overall_rating}/5</p>
                  {r.comment && <p className="text-sm text-gray-600 mt-1">{r.comment}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button type="button" onClick={() => handleReview(r.id, 'approve')} className="px-3 py-1.5 rounded-lg text-xs border">
                    Approve
                  </button>
                  <button type="button" onClick={() => handleReview(r.id, 'remove')} className="px-3 py-1.5 rounded-lg text-xs border text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-heading text-lg font-semibold mb-3">Users</h2>
      <div className="mb-10">
        <AdminUsersPanel />
      </div>

      <h2 className="font-heading text-lg font-semibold mb-3">Seed the directory</h2>
      <div className="mb-10">
        <AdminAddCompanyForm />
      </div>

      <h2 className="font-heading text-lg font-semibold mb-3">Manage companies</h2>
      <div className="mb-10">
        <AdminCompaniesPanel />
      </div>

      <h2 className="font-heading text-lg font-semibold mb-3">Scraper</h2>
      <div className="mb-10">
        <AdminScraperPanel />
      </div>

      <h2 className="font-heading text-lg font-semibold mb-3">Universities & coordinators</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={addUniversity} className="card space-y-3">
          <h3 className="font-heading font-semibold text-sm">Add a university</h3>
          <input
            placeholder="University name" className="input" value={uniForm.name}
            onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })} required
          />
          <input
            placeholder="State" className="input" value={uniForm.state}
            onChange={(e) => setUniForm({ ...uniForm, state: e.target.value })}
          />
          <button type="submit" className="btn-primary text-sm py-2">Add university</button>
        </form>

        <form onSubmit={addCoordinator} className="card space-y-3">
          <h3 className="font-heading font-semibold text-sm">Create a coordinator account</h3>
          <input
            placeholder="Full name" className="input" value={coordForm.fullName}
            onChange={(e) => setCoordForm({ ...coordForm, fullName: e.target.value })} required
          />
          <input
            type="email" placeholder="Email" className="input" value={coordForm.email}
            onChange={(e) => setCoordForm({ ...coordForm, email: e.target.value })} required
          />
          <input
            type="password" placeholder="Temporary password" className="input" value={coordForm.password}
            onChange={(e) => setCoordForm({ ...coordForm, password: e.target.value })} required minLength={6}
          />
          <select
            className="input" value={coordForm.universityId}
            onChange={(e) => setCoordForm({ ...coordForm, universityId: e.target.value })} required
          >
            <option value="">Select university</option>
            {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <input
            placeholder="Title (e.g. SIWES Coordinator)" className="input" value={coordForm.title}
            onChange={(e) => setCoordForm({ ...coordForm, title: e.target.value })}
          />
          <button type="submit" className="btn-primary text-sm py-2">Create coordinator</button>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute roles={['admin']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
