'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, setUserActive, deleteUser } from '../api/admin';

const ROLE_OPTIONS = [
  { value: '', label: 'All roles' },
  { value: 'student', label: 'Student' },
  { value: 'company', label: 'Company' },
  { value: 'coordinator', label: 'Coordinator' },
  { value: 'admin', label: 'Admin' },
];

export default function AdminUsersPanel() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [filters, setFilters] = useState({ role: '', q: '' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''));
    getUsers({ ...cleanFilters, page, limit: 20 })
      .then((res) => {
        setUsers(res.data);
        setMeta(res.meta);
      })
      .catch(() => setError('Could not load users.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filters, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFilterChange = (e) => {
    setPage(1);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleActive = async (u) => {
    try {
      await setUserActive(u.id, !u.is_active);
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, is_active: !u.is_active } : x)));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update this account.');
    }
  };

  const onDelete = async (u) => {
    const confirmed = window.confirm(
      `Permanently delete ${u.display_name || u.email}? This can't be undone. `
      + (u.role === 'student'
        ? 'Their applications, reviews, and saved companies will be deleted too.'
        : u.role === 'company'
          ? 'Their company listing will stay in the directory, unclaimed.'
          : 'Their profile data will be deleted.')
    );
    if (!confirmed) return;

    try {
      await deleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete this account.');
    }
  };

  return (
    <div>
      <div className="card mb-4 grid sm:grid-cols-3 gap-3">
        <input
          name="q" placeholder="Search by name or email" className="input sm:col-span-2"
          value={filters.q} onChange={onFilterChange}
        />
        <select name="role" className="input" value={filters.role} onChange={onFilterChange}>
          {ROLE_OPTIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading users...</p>
      ) : users.length === 0 ? (
        <div className="card text-center py-10">
          <p className="text-silver-dark text-sm">No users match these filters.</p>
        </div>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-silver-dark border-b border-silver/15 bg-silver-light/40">
                <th className="py-3 pl-4 pr-4 font-medium">Name</th>
                <th className="py-3 pr-4 font-medium">Email</th>
                <th className="py-3 pr-4 font-medium">Role</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Joined</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className={`border-b border-silver/10 last:border-0 transition-colors hover:bg-primary/[0.04] ${
                    i % 2 === 1 ? 'bg-silver-light/20' : 'bg-white'
                  }`}
                >
                  <td className="py-3 pl-4 pr-4 text-ink font-medium">
                    {u.display_name || <span className="text-silver font-normal">—</span>}
                  </td>
                  <td className="py-3 pr-4 text-silver-dark">{u.email}</td>
                  <td className="py-3 pr-4 capitalize text-silver-dark">{u.role}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                      <span
                        className={`w-2 h-2 rounded-full ${u.is_active ? 'bg-success' : 'bg-silver'}`}
                      />
                      <span className={u.is_active ? 'text-success' : 'text-silver-dark'}>
                        {u.is_active ? 'Active' : 'Deactivated'}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-silver-dark">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="py-3 pr-4">
                    {u.id === currentUser?.id ? (
                      <span className="text-xs text-silver">(you)</span>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => toggleActive(u)}
                          className="px-2.5 py-1 rounded-lg text-xs border border-silver/30 text-silver-dark hover:border-primary/40 hover:text-primary transition-colors"
                        >
                          {u.is_active ? 'Deactivate' : 'Reactivate'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(u)}
                          className="px-2.5 py-1 rounded-lg text-xs border border-danger/30 text-danger hover:bg-danger/5 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            type="button" disabled={!meta.hasPrevPage} onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg border border-silver/30 text-sm text-silver-dark hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-40 disabled:hover:border-silver/30 disabled:hover:text-silver-dark"
          >
            Previous
          </button>
          <span className="text-sm text-silver-dark">Page {meta.page} of {meta.totalPages}</span>
          <button
            type="button" disabled={!meta.hasNextPage} onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg border border-silver/30 text-sm text-silver-dark hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-40 disabled:hover:border-silver/30 disabled:hover:text-silver-dark"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
