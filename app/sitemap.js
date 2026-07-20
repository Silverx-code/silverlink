import { listAllCompanyIdsSSR } from '../src/api/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap() {
  const staticUrls = [
    { url: `${siteUrl}/`, priority: 1.0 },
    { url: `${siteUrl}/companies`, priority: 0.9 },
  ];

  // If the API is briefly unreachable during a build, ship the sitemap with just the
  // static pages rather than failing the entire deploy — it'll pick up companies again
  // on the next revalidation/build instead of blocking a release.
  try {
    const result = await listAllCompanyIdsSSR();
    const companies = result?.data || [];
    const companyUrls = companies.map((c) => ({
      url: `${siteUrl}/companies/${c.id}`,
      lastModified: new Date(),
      priority: 0.7,
    }));
    return [...staticUrls, ...companyUrls];
  } catch (err) {
    console.error('[sitemap] Could not fetch companies, shipping static URLs only:', err.message);
    return staticUrls;
  }
}
