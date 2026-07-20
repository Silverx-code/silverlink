'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const STATUS_OPTIONS = [
  { value: '', label: 'Any status' },
  { value: 'currently_accepting', label: 'Currently Accepting' },
  { value: 'pending_confirmation', label: 'Pending Confirmation' },
  { value: 'historical_listing', label: 'Historical Listing' },
  { value: 'applications_closed', label: 'Applications Closed' },
];

// This form doesn't fetch anything itself — it just writes to the URL. The actual data
// fetch happens server-side in the parent Server Component when Next re-renders it for
// the new URL, which is what keeps every filtered view crawlable and shareable as a link.
export default function DirectoryFilters({ initial }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    q: initial.q || '',
    department: initial.department || '',
    state: initial.state || '',
    city: initial.city || '',
    status: initial.status || '',
    listingType: initial.listingType || '',
  });
  const debounceRef = useRef(null);

  const applyFilters = (next) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.delete('page'); // any filter change resets pagination
    router.push(`/companies?${params.toString()}`);
  };

  // Text fields: debounce so we're not triggering a server re-render on every keystroke
  const onTextChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => applyFilters(updated), 400);
  };

  // Dropdowns: apply immediately, no debounce needed for a discrete choice
  const onSelectChange = (e) => {
    const updated = { ...filters, [e.target.name]: e.target.value };
    setFilters(updated);
    applyFilters(updated);
  };

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className="card mb-8 grid md:grid-cols-3 lg:grid-cols-6 gap-3">
      <input
        name="q" placeholder="Search by name" className="input lg:col-span-2"
        value={filters.q} onChange={onTextChange}
      />
      <input
        name="department" placeholder="Department" className="input"
        value={filters.department} onChange={onTextChange}
      />
      <input
        name="state" placeholder="State" className="input"
        value={filters.state} onChange={onTextChange}
      />
      <input
        name="city" placeholder="City" className="input"
        value={filters.city} onChange={onTextChange}
      />
      <select name="status" className="input" value={filters.status} onChange={onSelectChange}>
        {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
      <select name="listingType" className="input" value={filters.listingType} onChange={onSelectChange}>
        <option value="">Any type</option>
        <option value="siwes">SIWES</option>
        <option value="internship">Internship</option>
        <option value="graduate">Graduate Programme</option>
      </select>
    </div>
  );
}
