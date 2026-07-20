'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const dashboardLink = () => {
    if (user?.role === 'company') return '/company/dashboard';
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'coordinator') return '/university/dashboard';
    return '/dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl text-primary">
          Silver<span className="text-silver-dark">Link</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/companies" className="hover:text-primary">Companies</Link>
          {user ? (
            <>
              <Link href={dashboardLink()} className="hover:text-primary">Dashboard</Link>
              {user.role === 'student' && (
                <Link href="/dashboard/applications" className="hover:text-primary">Applications</Link>
              )}
              {user.role === 'company' && (
                <Link href="/company/applications" className="hover:text-primary">Applications</Link>
              )}
              <NotificationBell />
              <Link href="/settings" className="text-gray-400 hover:text-primary" title="Account settings">⚙</Link>
              <button
                type="button"
                onClick={() => { logout(); router.push('/'); }}
                className="text-gray-500 hover:text-red-500"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-primary">Log in</Link>
              <Link href="/register" className="hover:text-primary">Student sign up</Link>
              <Link href="/register/company" className="btn-primary text-sm py-2">For Companies</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
