'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';
import { getSavedCompanies } from '../../src/api/companies';
import { getRecommendations } from '../../src/api/applications';
import CompanyCard from '../../src/components/CompanyCard';
import ProfileCompletionBanner from '../../src/components/ProfileCompletionBanner';
import LoadingScreen from '../../src/components/LoadingScreen';
import ProtectedRoute from '../../src/components/ProtectedRoute';

function DashboardContent() {
  const { user, profile } = useAuth();
  const [saved, setSaved] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSavedCompanies(), getRecommendations()])
      .then(([savedRes, recRes]) => {
        setSaved(savedRes.data);
        setRecommended(recRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-1">
        Welcome{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
      </h1>
      <p className="text-gray-500 mb-8">{user?.email}</p>

      <ProfileCompletionBanner profile={profile} />

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="card">
          <p className="text-sm text-gray-400">Department</p>
          <p className="font-medium">{profile?.department || 'Not set'}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400">Level</p>
          <p className="font-medium">{profile?.level || 'Not set'}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400">Saved companies</p>
          <p className="font-medium">{saved.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-semibold">Recommended for you</h2>
        <span className="text-xs text-gray-400">Matched by department, location, and open status</span>
      </div>
      {recommended.length === 0 ? (
        <p className="text-gray-400 text-sm mb-10">
          Complete your department and preferred location in your profile to see matches here.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {recommended.slice(0, 4).map((c) => <CompanyCard key={c.id} company={c} />)}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-semibold">Saved Companies</h2>
        <div className="flex gap-4">
          <Link href="/dashboard/applications" className="text-primary text-sm font-medium">My applications →</Link>
          <Link href="/companies" className="text-primary text-sm font-medium">Browse directory →</Link>
        </div>
      </div>

      {saved.length === 0 ? (
        <p className="text-gray-400 text-sm">
          You haven&apos;t saved any companies yet. Browse the directory and tap &quot;Save Company&quot;
          on ones you&apos;re interested in.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {saved.map((c) => <CompanyCard key={c.id} company={c} />)}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute roles={['student']}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
