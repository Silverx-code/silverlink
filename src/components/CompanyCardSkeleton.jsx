export default function CompanyCardSkeleton() {
  return (
    <article className="animate-pulse rounded-[2rem] border border-slate-300 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-3xl bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-2">
            <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="h-7 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="mt-6 space-y-3">
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <div className="h-7 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-7 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-9 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </article>
  );
}
