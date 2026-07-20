'use client';

// Full-page loading state — used for auth gating and page-level data fetches.
// Keep this in sync with the Silver Link brand (blue/silver, Poppins heading).
export default function LoadingScreen({ label = 'Loading...' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="font-heading font-bold text-2xl text-primary flex items-center gap-0.5">
        Silver<span className="text-silver-dark">Link</span>
      </div>
      <div className="w-8 h-8 border-[3px] border-gray-200 border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
