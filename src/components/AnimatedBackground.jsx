'use client';

import { usePathname } from 'next/navigation';

const variantMap = {
  home: 'home',
  companies: 'directory',
  company: 'directory',
  dashboard: 'dashboard',
  admin: 'admin',
  university: 'dashboard',
};

function resolveVariant(pathname) {
  const clean = pathname?.split('?')[0] || '/';
  const [root] = clean.split('/').filter(Boolean);
  return variantMap[root] || 'home';
}

export default function AnimatedBackground() {
  const pathname = usePathname();
  const variant = resolveVariant(pathname);

  const isHome = variant === 'home';
  const isDirectory = variant === 'directory';
  const isDashboard = variant === 'dashboard';
  const isAdmin = variant === 'admin';

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,79,216,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,178,56,0.12),transparent_35%)]" />
      <div className="absolute inset-0 opacity-70 mix-blend-screen dark:mix-blend-screen" style={{ backgroundImage: 'linear-gradient(120deg, rgba(30,79,216,0.08) 0%, transparent 38%, rgba(255,178,56,0.06) 100%)' }} />

      {isHome && (
        <>
          <div className="absolute left-[8%] top-[16%] h-40 w-40 rounded-full bg-primary/15 blur-3xl animate-[drift_16s_ease-in-out_infinite]" />
          <div className="absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full bg-accent/12 blur-3xl animate-[drift_20s_ease-in-out_infinite_reverse]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,79,216,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(30,79,216,0.10)_1px,transparent_1px)] bg-[size:70px_70px] opacity-40" />
        </>
      )}

      {isDirectory && (
        <>
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute left-[12%] top-[20%] h-32 w-64 rounded-full border border-primary/20 animate-[network-flow_16s_linear_infinite]" />
          <div className="absolute right-[10%] top-[28%] h-28 w-44 rounded-full border border-accent/20 animate-[network-flow_18s_linear_infinite_reverse]" />
          <div className="absolute bottom-[16%] left-[18%] h-24 w-72 rounded-full border border-primary/15 animate-[network-flow_20s_linear_infinite]" />
        </>
      )}

      {isDashboard && (
        <>
          <div className="absolute left-[6%] top-[12%] h-24 w-24 rounded-full border border-primary/20" />
          <div className="absolute right-[12%] top-[18%] h-28 w-28 rounded-full border border-accent/20 animate-[pulse-glow_7s_ease-in-out_infinite]" />
          <div className="absolute bottom-[8%] left-[20%] h-40 w-40 rounded-full border border-primary/15 animate-[drift_14s_ease-in-out_infinite]" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-35">
            <path d="M8 30 C 24 16, 42 16, 56 32 S 86 48, 98 24" stroke="rgba(30,79,216,0.3)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M12 68 C 28 54, 44 54, 60 70 S 86 84, 92 66" stroke="rgba(255,178,56,0.24)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </svg>
        </>
      )}

      {isAdmin && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(30,79,216,0.12)_0%,transparent_50%)]" />
          <div className="absolute left-[18%] top-[16%] h-24 w-24 rounded-full bg-primary/10 blur-2xl animate-[pulse-glow_5s_ease-in-out_infinite]" />
          <div className="absolute bottom-[12%] right-[18%] h-32 w-32 rounded-full bg-accent/10 blur-2xl animate-[pulse-glow_6s_ease-in-out_infinite_reverse]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-primary/10 to-transparent" />
        </>
      )}
    </div>
  );
}
