import Link from 'next/link';

// Recommendations and search relevance both depend on department + preferred location
// being filled in. Surface what's missing rather than silently degrading match quality.
export default function ProfileCompletionBanner({ profile }) {
  if (!profile) return null;

  const missing = [];
  if (!profile.department) missing.push('department');
  if (!profile.preferred_state) missing.push('preferred location');
  if (!profile.cv_url) missing.push('CV');

  if (missing.length === 0) return null;

  return (
    <div className="bg-accent/10 border border-accent/25 rounded-2xl p-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 w-7 h-7 rounded-full bg-accent/20 text-accent-dark flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <p className="text-sm text-ink">
          Add your <strong>{missing.join(', ')}</strong> to get better company matches and stronger applications.
        </p>
      </div>
      <Link href="/dashboard/profile" className="text-sm text-primary font-medium shrink-0 hover:text-primary-dark">
        Complete profile →
      </Link>
    </div>
  );
}
