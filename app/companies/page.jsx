import Link from 'next/link';
import { searchCompaniesSSR } from '../../src/api/server';
import CompanyCard from '../../src/components/CompanyCard';
import DirectoryFilters from '../../src/components/DirectoryFilters';

export const metadata = {
  title: 'Company Directory',
  description: 'Browse companies accepting SIWES students in Nigeria, filtered by department, state, city, and application status.',
};

export default async function CompanyDirectoryPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const result = await searchCompaniesSSR({ ...searchParams, page, limit: 12 });
  const companies = result?.data || [];
  const meta = result?.meta;

  const buildPageHref = (targetPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', targetPage);
    return `/companies?${params.toString()}`;
  };

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 rounded-[2rem] border border-primary/10 bg-white/70 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Networked opportunities</p>
            <h1 className="mt-2 font-heading text-2xl font-bold text-ink dark:text-slate-50">Company Directory</h1>
            <p className="mt-2 max-w-2xl text-sm text-silver-dark dark:text-slate-400">
              Discover placements that are actively connecting students with companies across the country.
            </p>
          </div>
          <div className="rounded-full border border-primary/10 bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:border-primary/20 dark:bg-primary/15">
            Live network feed
          </div>
        </div>
      </div>

      <DirectoryFilters initial={searchParams} />

      {companies.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-silver/40 bg-white/60 px-6 py-12 text-center text-sm text-silver-dark dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
          No companies match your filters yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {meta.hasPrevPage ? (
            <Link href={buildPageHref(meta.page - 1)} className="rounded-full border border-silver/40 px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">Previous</Link>
          ) : (
            <span className="rounded-full border border-silver/20 px-4 py-2 text-sm opacity-40">Previous</span>
          )}
          <span className="text-sm text-silver-dark dark:text-slate-400">Page {meta.page} of {meta.totalPages}</span>
          {meta.hasNextPage ? (
            <Link href={buildPageHref(meta.page + 1)} className="rounded-full border border-silver/40 px-4 py-2 text-sm transition-colors hover:border-primary/40 hover:text-primary">Next</Link>
          ) : (
            <span className="rounded-full border border-silver/20 px-4 py-2 text-sm opacity-40">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
