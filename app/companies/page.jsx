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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-heading text-2xl font-bold mb-6">Company Directory</h1>

      <DirectoryFilters initial={searchParams} />

      {companies.length === 0 ? (
        <p className="text-gray-400 text-center py-10">No companies match your filters yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {companies.map((c) => <CompanyCard key={c.id} company={c} />)}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          {meta.hasPrevPage ? (
            <Link href={buildPageHref(meta.page - 1)} className="px-4 py-2 rounded-lg border">Previous</Link>
          ) : (
            <span className="px-4 py-2 rounded-lg border opacity-40">Previous</span>
          )}
          <span className="text-sm text-gray-500">Page {meta.page} of {meta.totalPages}</span>
          {meta.hasNextPage ? (
            <Link href={buildPageHref(meta.page + 1)} className="px-4 py-2 rounded-lg border">Next</Link>
          ) : (
            <span className="px-4 py-2 rounded-lg border opacity-40">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
