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
        <p className="text-gray-400 text-sm">No users match these filters.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Role</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Joined</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 pr-4">{u.display_name || <span className="text-gray-300">—</span>}</td>
                  <td className="py-2 pr-4 text-gray-500">{u.email}</td>
                  <td className="py-2 pr-4 capitalize">{u.role}</td>
                  <td className="py-2 pr-4">
                    {u.is_active ? (
                      <span className="badge-accepting">Active</span>
                    ) : (
                      <span className="badge-closed">Deactivated</span>
                    )}
                  </td>
                  <td className="py-2 pr-4 text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="py-2">
                    {u.id === currentUser?.id ? (
                      <span className="text-xs text-gray-300">(you)</span>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => toggleActive(u)}
                          className="px-2.5 py-1 rounded-lg text-xs border"
                        >
                          {u.is_active ? 'Deactivate' : 'Reactivate'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(u)}
                          className="px-2.5 py-1 rounded-lg text-xs border text-red-500"
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
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {meta.page} of {meta.totalPages}</span>
          <button
            type="button" disabled={!meta.hasNextPage} onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
