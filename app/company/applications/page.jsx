'use client';

import { useEffect, useState } from 'react';
import { listMyApplications, updateApplicationStatus } from '../../../src/api/company';
import ChatPanel from '../../../src/components/ChatPanel';
import InlineSpinner from '../../../src/components/InlineSpinner';
import ProtectedRoute from '../../../src/components/ProtectedRoute';

const STATUS_STYLES = {
  pending: 'badge-pending',
  reviewed: 'bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full',
  accepted: 'badge-accepting',
  rejected: 'badge-closed',
};

function CompanyApplicationsContent() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ department: '', level: '', status: '' });
  const [activeId, setActiveId] = useState(null);

  const load = () => {
    setLoading(true);
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
    listMyApplications(cleanFilters).then((res) => setApplications(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filters]);

  const setStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-6">Applications</h1>

      <div className="card mb-6 grid sm:grid-cols-3 gap-3">
        <input
          placeholder="Filter by department" className="input"
          value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}
        />
        <input
          placeholder="Filter by level (e.g. 300)" className="input"
          value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        />
        <select
          className="input" value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Any status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><InlineSpinner size={28} /></div>
      ) : applications.length === 0 ? (
        <p className="text-gray-400 text-sm">No applications match these filters.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{app.student_name}</p>
                  <p className="text-sm text-gray-500">{app.department} · {app.level} Level</p>
                  <p className="text-sm text-gray-400 mt-1">{app.student_email}</p>
                  {app.cv_url && (
                    <a href={app.cv_url} target="_blank" rel="noreferrer" className="text-sm text-primary font-medium mt-1 inline-block">
                      View CV →
                    </a>
                  )}
                </div>
                <span className={STATUS_STYLES[app.status] || 'badge-historical'}>{app.status}</span>
              </div>

              {app.cover_note && (
                <p className="text-sm text-gray-600 mt-3 border-t border-gray-100 pt-3">{app.cover_note}</p>
              )}

              <div className="flex gap-2 mt-4 items-center flex-wrap">
                {['reviewed', 'accepted', 'rejected'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(app.id, s)}
                    disabled={app.status === s}
                    className="px-3 py-1.5 rounded-lg text-xs border disabled:opacity-40 capitalize"
                  >
                    Mark {s}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setActiveId(activeId === app.id ? null : app.id)}
                  className="text-sm text-primary font-medium ml-auto"
                >
                  {activeId === app.id ? 'Hide chat' : 'Chat'}
                </button>
              </div>

              {activeId === app.id && (
                <div className="mt-4">
                  <ChatPanel applicationId={app.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CompanyApplicationsPage() {
  return (
    <ProtectedRoute roles={['company']}>
      <CompanyApplicationsContent />
    </ProtectedRoute>
  );
}
