import CompanyCardSkeleton from '../../src/components/CompanyCardSkeleton';

export default function CompaniesLoading() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 animate-pulse rounded-[2rem] border border-primary/10 bg-white/70 p-6 shadow-card dark:border-slate-800 dark:bg-slate-900/70">
        <div className="h-3 w-40 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-4 h-7 w-56 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="card mb-6 grid animate-pulse gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => <CompanyCardSkeleton key={index} />)}
      </div>
    </div>
  );
}
