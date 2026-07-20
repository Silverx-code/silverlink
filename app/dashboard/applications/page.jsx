'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMyApplications } from '../../../src/api/applications';
import api from '../../../src/api/client';
import ChatPanel from '../../../src/components/ChatPanel';
import LoadingScreen from '../../../src/components/LoadingScreen';
import ProtectedRoute from '../../../src/components/ProtectedRoute';

const STATUS_STYLES = {
  pending: 'badge-pending',
  reviewed: 'bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full',
  accepted: 'badge-accepting',
  rejected: 'badge-closed',
};

function StudentApplicationsContent() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  const load = () => {
    getMyApplications().then((res) => setApplications(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const withdraw = async (id) => {
    if (!window.confirm('Withdraw this application? This can\'t be undone.')) return;
    await api.delete(`/students/me/applications/${id}`);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-400 text-sm">
          You haven&apos;t applied to any companies yet. Browse the directory and apply from a company&apos;s profile.
        </p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    {app.logo_url ? (
                      <Image src={app.logo_url} alt={app.company_name} fill className="object-cover" sizes="40px" />
                    ) : (
                      <span className="text-primary font-heading font-bold">{app.company_name?.[0]}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{app.company_name}</p>
                    <p className="text-xs text-gray-400">Applied {new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={STATUS_STYLES[app.status] || 'badge-historical'}>{app.status}</span>
                  <button
                    type="button"
                    onClick={() => setActiveId(activeId === app.id ? null : app.id)}
                    className="text-sm text-primary font-medium"
                  >
                    {activeId === app.id ? 'Hide chat' : 'Chat'}
                  </button>
                  {app.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => withdraw(app.id)}
                      className="text-sm text-red-500 font-medium"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
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

export default function StudentApplicationsPage() {
  return (
    <ProtectedRoute roles={['student']}>
      <StudentApplicationsContent />
    </ProtectedRoute>
  );
}
