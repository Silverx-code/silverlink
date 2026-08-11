'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';
import { getSavedCompanies } from '../../src/api/companies';
import { getRecommendations } from '../../src/api/applications';
import CompanyCard from '../../src/components/CompanyCard';
import ProfileCompletionBanner from '../../src/components/ProfileCompletionBanner';
import DashboardSkeleton from '../../src/components/DashboardSkeleton';
import ProtectedRoute from '../../src/components/ProtectedRoute';

function DashboardContent() {
  const { user, profile } = useAuth();
  const [saved, setSaved] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecommendationsReady, setShowRecommendationsReady] = useState(false);
  const hasRecommendationProfile = Boolean(profile?.department && profile?.preferred_state);

  useEffect(() => {
    setLoading(true);

    const requests = [getSavedCompanies()];
    if (hasRecommendationProfile) requests.push(getRecommendations());

    Promise.all(requests)
      .then(([savedRes, recRes]) => {
        setSaved(savedRes.data);
        setRecommended(recRes?.data || []);
      })
      .finally(() => setLoading(false));
  }, [hasRecommendationProfile]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowRecommendationsReady(params.get('recommendations') === 'ready');
  }, []);

  if (loading) return <DashboardSkeleton title="Loading your dashboard..." />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 rounded-[2rem] border border-primary/10 bg-white/70 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
        <p className="eyebrow">Your placement network</p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-ink dark:text-slate-50">
          Welcome{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-2 text-sm text-silver-dark dark:text-slate-400">{user?.email}</p>
      </div>

      <ProfileCompletionBanner profile={profile} />

      {showRecommendationsReady && hasRecommendationProfile && (
        <div className="mb-8 rounded-[1.5rem] border border-success/20 bg-success/10 p-4 text-sm text-success">
          Profile complete. Your company recommendations are ready below.
        </div>
      )}

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-gray-400 dark:text-slate-400">Department</p>
          <p className="font-medium dark:text-slate-100">{profile?.department || 'Not set'}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 dark:text-slate-400">Level</p>
          <p className="font-medium dark:text-slate-100">{profile?.level || 'Not set'}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-400 dark:text-slate-400">Saved companies</p>
          <p className="font-medium dark:text-slate-100">{saved.length}</p>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-heading text-lg font-semibold dark:text-slate-50">Recommended for you</h2>
        <span className="text-xs text-gray-400 dark:text-slate-400">Matched by department, location, and open status</span>
      </div>

      {!hasRecommendationProfile ? (
        <p className="mb-10 text-sm text-gray-400 dark:text-slate-400">
          Complete your department and preferred location in your profile to see matches here.
        </p>
      ) : recommended.length === 0 ? (
        <div className="mb-10 rounded-[1.5rem] border border-silver/20 bg-white/70 p-5 text-sm text-silver-dark shadow-card dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
          No close matches yet. You can still browse the company directory while new listings are added.
          <Link href="/companies" className="ml-1 font-medium text-primary hover:text-primary-dark">
            Browse directory &rarr;
          </Link>
        </div>
      ) : (
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/80 p-4 shadow-card dark:border-slate-800 dark:bg-slate-900/70">
          <p className="mb-4 text-sm text-silver-dark dark:text-slate-400">
            These companies are ranked using your department, preferred location, current application status, and student ratings.
          </p>
          <div className="space-y-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300/80 scrollbar-track-transparent dark:scrollbar-thumb-slate-700/40">
            <div className="flex gap-4 min-w-[140%] md:min-w-full md:gap-5">
              {recommended.slice(0, 4).map((c) => (
                <div key={c.id} className="min-w-[320px] flex-1 md:min-w-[calc(50%-1rem)]">
                  <CompanyCard company={c} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold dark:text-slate-50">Saved Companies</h2>
        <div className="flex gap-4">
          <Link href="/dashboard/applications" className="text-sm font-medium text-primary">My applications &rarr;</Link>
          <Link href="/companies" className="text-sm font-medium text-primary">Browse directory &rarr;</Link>
        </div>
      </div>

      {saved.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-slate-400">
          You haven&apos;t saved any companies yet. Browse the directory and tap &quot;Save Company&quot;
          on ones you&apos;re interested in.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
