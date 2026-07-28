'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCompaniesAdmin, deleteCompanyAdmin } from '../api/admin';

const STATUS_LABEL = {
  currently_accepting: { text: 'Currently Accepting', cls: 'badge-accepting' },
  pending_confirmation: { text: 'Pending Confirmation', cls: 'badge-pending' },
  historical_listing: { text: 'Historical Listing', cls: 'badge-historical' },
  applications_closed: { text: 'Applications Closed', cls: 'badge-closed' },
};

export default function AdminCompaniesPanel() {
  const [companies, setCompanies] = useState([]);
  const [meta, setMeta] = useState(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    getCompaniesAdmin({ q: q || undefined, page, limit: 20 })
      .then((res) => {
        setCompanies(res.data);
        setMeta(res.meta);
      })
      .catch(() => setError('Could not load companies.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const onDelete = async (c) => {
    const activityWarning = (c.application_count > 0 || c.review_count > 0)
      ? ` This will permanently delete ${c.application_count} application(s) and ${c.review_count} review(s) tied to this listing.`
      : '';
    const claimedWarning = c.claimed
      ? ' This listing is claimed — the company\u2019s login account will NOT be deleted, only this directory listing.'
      : '';

    const confirmed = window.confirm(
      `Permanently delete "${c.name}" from the directory? This can't be undone.${activityWarning}${claimedWarning}`
    );
    if (!confirmed) return;

    try {
      await deleteCompanyAdmin(c.id);
      setCompanies((prev) => prev.filter((x) => x.id !== c.id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete this company.');
    }
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit} className="card mb-4 flex gap-3">
        <input
          placeholder="Search by name or industry" className="input"
          value={q} onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit" className="btn-primary text-sm py-2 shrink-0">Search</button>
      </form>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading companies...</p>
      ) : companies.length === 0 ? (
        <p className="text-gray-400 text-sm">No companies match this search.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Claimed</th>
                <th className="pb-2 pr-4">Verified</th>
                <th className="pb-2 pr-4">Applications</th>
                <th className="pb-2 pr-4">Reviews</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => {
                const status = STATUS_LABEL[c.status] || STATUS_LABEL.historical_listing;
                return (
                  <tr key={c.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 pr-4">
                      <Link href={`/companies/${c.id}`} target="_blank" className="text-primary hover:underline">
                        {c.name}
                      </Link>
                      <p className="text-xs text-gray-400">{c.industry}</p>
                    </td>
                    <td className="py-2 pr-4"><span className={status.cls}>{status.text}</span></td>
                    <td className="py-2 pr-4">{c.claimed ? 'Yes' : <span className="text-gray-300">No</span>}</td>
                    <td className="py-2 pr-4">{c.is_verified ? 'Yes' : <span className="text-gray-300">No</span>}</td>
                    <td className="py-2 pr-4">{c.application_count}</td>
                    <td className="py-2 pr-4">{c.review_count}</td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => onDelete(c)}
                        className="px-2.5 py-1 rounded-lg text-xs border text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
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
