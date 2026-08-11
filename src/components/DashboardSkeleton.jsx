import CompanyCardSkeleton from './CompanyCardSkeleton';

export default function DashboardSkeleton({ title = 'Loading...' }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 animate-pulse rounded-[2rem] border border-primary/10 bg-white/70 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/70">
        <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-4 h-7 w-56 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-3 h-4 w-72 rounded bg-slate-200 dark:bg-slate-700" />
        <span className="sr-only">{title}</span>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="card animate-pulse">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="mt-3 h-5 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="mb-4 h-5 w-44 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((item) => <CompanyCardSkeleton key={item} />)}
      </div>
    </div>
  );
}
