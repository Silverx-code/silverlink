'use client';

import Logo from './Logo';

// Full-page loading state — used for auth gating and page-level data fetches.
export default function LoadingScreen({ label = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
      <Logo size={34} />
      <div className="w-8 h-8 border-[3px] border-silver/30 border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-silver-dark">{label}</p>
    </div>
  );
}
