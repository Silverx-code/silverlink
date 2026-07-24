'use client';

import Logo from './Logo';
import BrandSpinner from './BrandSpinner';

// Full-page loading state — used for auth gating and page-level data fetches.
export default function LoadingScreen({ label = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <Logo size={34} showWordmark={false} />
      <BrandSpinner size={32} />
      <p className="text-sm text-silver-dark">{label}</p>
    </div>
  );
}
