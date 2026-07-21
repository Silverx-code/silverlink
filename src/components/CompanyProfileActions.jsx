'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveCompany } from '../api/companies';
import { applyToCompany } from '../api/applications';

export default function CompanyProfileActions({ companyId, status }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [applyStatus, setApplyStatus] = useState(''); // '' | 'sending' | 'sent' | 'error'
  const [applyError, setApplyError] = useState('');

  if (!user) return null;

  const onSave = async () => {
    try {
      await saveCompany(companyId);
      setSaved(true);
    } catch {
      // silent — button just stays unsaved
    }
  };

  const onApply = async (e) => {
    e.preventDefault();
    setApplyStatus('sending');
    setApplyError('');
    try {
      await applyToCompany(companyId, coverNote);
      setApplyStatus('sent');
    } catch (err) {
      setApplyStatus('error');
      setApplyError(err.response?.data?.message || 'Could not submit your application.');
    }
  };

  return (
    <div>
      <div className="flex flex-row sm:flex-col flex-wrap gap-2 items-stretch sm:items-end shrink-0">
        <button type="button" onClick={onSave} className="btn-primary text-sm py-2">
          {saved ? 'Saved ✓' : 'Save Company'}
        </button>
        {user.role === 'student' && status === 'currently_accepting' && applyStatus !== 'sent' && (
          <button
            type="button"
            onClick={() => setApplyOpen((v) => !v)}
            className="btn-secondary text-sm py-2 border-primary text-primary hover:bg-primary/5"
          >
            Apply
          </button>
        )}
        {applyStatus === 'sent' && (
          <span className="text-sm text-success font-medium flex items-center gap-1">
            Application sent
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>

      {applyOpen && applyStatus !== 'sent' && (
        <form onSubmit={onApply} className="card mt-4 space-y-3">
          <textarea
            placeholder="Optional note to the company (why you're a good fit, availability, etc.)"
            className="input min-h-[80px]"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
          />
          {applyError && <p className="text-sm text-danger">{applyError}</p>}
          <button type="submit" disabled={applyStatus === 'sending'} className="btn-primary text-sm py-2 disabled:opacity-60">
            {applyStatus === 'sending' ? 'Submitting...' : 'Submit application'}
          </button>
        </form>
      )}
    </div>
  );
}
