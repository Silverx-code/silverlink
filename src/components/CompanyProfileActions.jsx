'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveCompany } from '../api/companies';
import { applyToCompany } from '../api/applications';

export default function CompanyProfileActions({ companyId, status, applyMethod }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [applyStatus, setApplyStatus] = useState(''); // '' | 'sending' | 'sent' | 'error'
  const [applyError, setApplyError] = useState('');

  if (!user) return null;

  // Companies with an alternate apply method (email/in-person/external link) show that
  // instead, server-rendered on the page — there's no dashboard on the other end yet to
  // receive an in-platform application, so offering this button would be a dead end.
  const usesPlatformApply = !applyMethod || applyMethod === 'platform';

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
      <div className="flex flex-col gap-2 items-end shrink-0">
        <button type="button" onClick={onSave} className="btn-primary text-sm py-2">
          {saved ? 'Saved ✓' : 'Save Company'}
        </button>
        {usesPlatformApply && user.role === 'student' && status === 'currently_accepting' && applyStatus !== 'sent' && (
          <button
            type="button"
            onClick={() => setApplyOpen((v) => !v)}
            className="text-sm border border-primary text-primary px-4 py-2 rounded-xl"
          >
            Apply
          </button>
        )}
        {applyStatus === 'sent' && <span className="text-sm text-green-600">Application sent ✓</span>}
      </div>

      {usesPlatformApply && applyOpen && applyStatus !== 'sent' && (
        <form onSubmit={onApply} className="card mt-4 space-y-3">
          <textarea
            placeholder="Optional note to the company (why you're a good fit, availability, etc.)"
            className="input min-h-[80px]"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
          />
          {applyError && <p className="text-sm text-red-500">{applyError}</p>}
          <button type="submit" disabled={applyStatus === 'sending'} className="btn-primary text-sm py-2">
            {applyStatus === 'sending' ? 'Submitting...' : 'Submit application'}
          </button>
        </form>
      )}
    </div>
  );
}
