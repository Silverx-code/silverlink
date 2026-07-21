'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardLink = () => {
    if (user?.role === 'company') return '/company/dashboard';
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'coordinator') return '/university/dashboard';
    return '/dashboard';
  };

  return (
    <header className="bg-white/90 backdrop-blur border-b border-silver/20 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Logo size={30} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink">
          <Link href="/companies" className="hover:text-primary transition-colors">Companies</Link>
          {user ? (
            <>
              <Link href={dashboardLink()} className="hover:text-primary transition-colors">Dashboard</Link>
              {user.role === 'student' && (
                <Link href="/dashboard/applications" className="hover:text-primary transition-colors">Applications</Link>
              )}
              {user.role === 'company' && (
                <Link href="/company/applications" className="hover:text-primary transition-colors">Applications</Link>
              )}
              <NotificationBell />
              <Link href="/settings" className="text-silver-dark hover:text-primary transition-colors" title="Account settings">⚙</Link>
              <button
                type="button"
                onClick={() => { logout(); router.push('/'); }}
                className="text-silver-dark hover:text-danger transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary transition-colors">Log in</Link>
              <Link href="/register" className="hover:text-primary transition-colors">Student sign up</Link>
              <Link href="/register/company" className="btn-primary text-sm py-2">For Companies</Link>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 -mr-2 text-ink"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-silver/20 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium text-ink animate-fade-up">
          <Link href="/companies" onClick={() => setMenuOpen(false)} className="hover:text-primary">Companies</Link>
          {user ? (
            <>
              <Link href={dashboardLink()} onClick={() => setMenuOpen(false)} className="hover:text-primary">Dashboard</Link>
              {user.role === 'student' && (
                <Link href="/dashboard/applications" onClick={() => setMenuOpen(false)} className="hover:text-primary">Applications</Link>
              )}
              {user.role === 'company' && (
                <Link href="/company/applications" onClick={() => setMenuOpen(false)} className="hover:text-primary">Applications</Link>
              )}
              <Link href="/settings" onClick={() => setMenuOpen(false)} className="text-silver-dark">Settings</Link>
              <button
                type="button"
                onClick={() => { logout(); setMenuOpen(false); router.push('/'); }}
                className="text-left text-silver-dark hover:text-danger"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-primary">Log in</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="hover:text-primary">Student sign up</Link>
              <Link href="/register/company" onClick={() => setMenuOpen(false)} className="btn-primary text-sm py-2 w-fit">For Companies</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
