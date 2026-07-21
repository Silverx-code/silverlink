'use client';

import { useState } from 'react';
import { createCompanyAdmin } from '../api/companies';
import { findOrCreateLocation } from '../api/locations';

const STATUS_OPTIONS = [
  { value: 'currently_accepting', label: 'Currently Accepting' },
  { value: 'pending_confirmation', label: 'Pending Confirmation' },
  { value: 'historical_listing', label: 'Historical Listing' },
  { value: 'applications_closed', label: 'Applications Closed' },
];

const APPLY_METHODS = [
  {
    value: 'platform',
    label: 'Apply through Silver Link',
    hint: 'Only makes sense once a real person from the company is checking a Silver Link dashboard. For a seeded/unclaimed listing, applications will sit unseen until someone claims it.',
  },
  {
    value: 'email',
    label: 'Apply by email',
    hint: 'Students get a "Send your CV" button that opens their mail app addressed to the email you provide.',
  },
  {
    value: 'in_person',
    label: 'Apply in person',
    hint: 'Give walk-in instructions — where to go, who to ask for, what hours.',
  },
  {
    value: 'external_link',
    label: 'Apply on their own site/form',
    hint: 'Students get a button linking out to the company\'s own careers page or application form.',
  },
];

const emptyForm = {
  name: '',
  industry: '',
  description: '',
  website: '',
  address: '',
  state: '',
  city: '',
  status: 'historical_listing',
  departments: '',
  applyMethod: 'platform',
  applyEmail: '',
  applyInstructions: '',
  applyUrl: '',
};

export default function AdminAddCompanyForm({ onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const selectedMethod = APPLY_METHODS.find((m) => m.value === form.applyMethod);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);
    try {
      let locationId;
      if (form.state && form.city) {
        const locRes = await findOrCreateLocation(form.state, form.city);
        locationId = locRes.data.id;
      }

      const res = await createCompanyAdmin({
        name: form.name,
        industry: form.industry || undefined,
        description: form.description || undefined,
        website: form.website || undefined,
        address: form.address || undefined,
        locationId,
        status: form.status,
        departments: form.departments
          ? form.departments.split(',').map((d) => d.trim()).filter(Boolean)
          : [],
        applyMethod: form.applyMethod,
        applyEmail: form.applyMethod === 'email' ? form.applyEmail : undefined,
        applyInstructions: form.applyMethod === 'in_person' ? form.applyInstructions : undefined,
        applyUrl: form.applyMethod === 'external_link' ? form.applyUrl : undefined,
      });

      setMessage(`"${res.data.name}" added to the directory.`);
      setForm(emptyForm);
      onCreated?.(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create the company listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-3">
      <h3 className="font-heading font-semibold text-sm">Add a company (seed a listing)</h3>
      <p className="text-xs text-gray-400">
        For companies that haven&apos;t registered themselves yet. They can claim this listing later
        from the &quot;Register your company&quot; page.
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        <input placeholder="Company name" className="input" value={form.name} onChange={set('name')} required />
        <input placeholder="Industry" className="input" value={form.industry} onChange={set('industry')} />
      </div>

      <textarea placeholder="Description" className="input min-h-[70px]" value={form.description} onChange={set('description')} />

      <div className="grid sm:grid-cols-2 gap-3">
        <input placeholder="Website" className="input" value={form.website} onChange={set('website')} />
        <input placeholder="Address" className="input" value={form.address} onChange={set('address')} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input placeholder="State" className="input" value={form.state} onChange={set('state')} />
        <input placeholder="City" className="input" value={form.city} onChange={set('city')} />
      </div>

      <input
        placeholder="Accepted departments, comma-separated (e.g. Computer Science, Accounting)"
        className="input" value={form.departments} onChange={set('departments')}
      />

      <div>
        <label className="text-xs text-gray-400 mb-1 block">Application status</label>
        <select className="input" value={form.status} onChange={set('status')}>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <label className="text-xs text-gray-400 mb-1 block">How should students apply?</label>
        <select className="input" value={form.applyMethod} onChange={set('applyMethod')}>
          {APPLY_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
        {selectedMethod && <p className="text-xs text-gray-400 mt-1.5">{selectedMethod.hint}</p>}

        {form.applyMethod === 'email' && (
          <input
            type="email" placeholder="Contact email for applications" className="input mt-2"
            value={form.applyEmail} onChange={set('applyEmail')} required
          />
        )}
        {form.applyMethod === 'in_person' && (
          <textarea
            placeholder="e.g. Walk in with a CV, ask for HR, Mon–Fri 9am–4pm" className="input mt-2 min-h-[60px]"
            value={form.applyInstructions} onChange={set('applyInstructions')} required
          />
        )}
        {form.applyMethod === 'external_link' && (
          <input
            type="url" placeholder="https://company.com/careers" className="input mt-2"
            value={form.applyUrl} onChange={set('applyUrl')} required
          />
        )}
      </div>

      {message && <p className="text-sm text-green-600">{message}</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary text-sm py-2">
        {submitting ? 'Adding...' : 'Add company'}
      </button>
    </form>
  );
}
