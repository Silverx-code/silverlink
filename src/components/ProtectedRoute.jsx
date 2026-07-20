'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from './LoadingScreen';

// Wraps a page so only authenticated users of the right role(s) can view it.
// Pass no `roles` to allow any authenticated user (same behavior as before).
// Next's App Router has no <Navigate> equivalent for client components, so the
// redirect happens imperatively via useRouter inside an effect.
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (roles && !roles.includes(user.role)) {
      router.replace('/');
    }
  }, [loading, user, roles, router]);

  if (loading || !user || (roles && !roles.includes(user.role))) return <LoadingScreen />;
  return children;
}
