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
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
      <p className="text-sm text-gray-700">
        Add your <strong>{missing.join(', ')}</strong> to get better company matches and stronger applications.
      </p>
      <Link href="/dashboard/profile" className="text-sm text-primary font-medium shrink-0">
        Complete profile →
      </Link>
    </div>
  );
}
