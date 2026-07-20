// Used exclusively inside Server Components — never imported by 'use client' files.
// This is what actually closes the SEO gap: these calls run during the request on the
// server, so the HTML that reaches the browser (and crawlers) already has real content.
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function serverFetch(path, { revalidate = 60, searchParams } = {}) {
  const url = new URL(`${API_URL}${path}`);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    // Revalidate periodically rather than caching forever or refetching every request —
    // company data changes but not every second. Adjust per-call when freshness matters more.
    next: { revalidate },
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  return res.json();
}

export const getCompanySSR = (id) => serverFetch(`/companies/${id}`, { revalidate: 120 });
export const getCompanyReviewsSSR = (id) => serverFetch(`/companies/${id}/reviews`, { revalidate: 300 });
export const searchCompaniesSSR = (params) => serverFetch('/companies', { searchParams: params, revalidate: 60 });
export const listAllCompanyIdsSSR = () => serverFetch('/companies', { searchParams: { limit: 1000 }, revalidate: 3600 });

export { API_URL };
