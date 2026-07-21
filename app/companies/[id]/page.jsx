import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCompanySSR, getCompanyReviewsSSR } from '../../../src/api/server';
import CompanyProfileActions from '../../../src/components/CompanyProfileActions';

// This is what actually closes the SEO gap: metadata is computed per-company on the
// server before the response ever reaches the browser or a crawler. Compare this to
// the old approach (react-helmet-async), which injected these tags client-side after
// JS ran — a crawler or link-preview bot that doesn't execute JS never saw them.
export async function generateMetadata({ params }) {
  const company = await getCompanySSR(params.id);
  if (!company) return { title: 'Company not found' };

  const description = company.description
    ? company.description.slice(0, 155)
    : `${company.name} — ${company.industry || 'SIWES placement'} in ${[company.city, company.state].filter(Boolean).join(', ') || 'Nigeria'}. See accepted departments, reviews, and current application status on Silver Link.`;

  return {
    title: company.name,
    description,
    openGraph: {
      title: company.name,
      description,
      images: company.logo_url ? [company.logo_url] : undefined,
    },
    twitter: {
      card: 'summary',
      title: company.name,
      description,
    },
  };
}

const STATUS_LABEL = {
  currently_accepting: 'Currently Accepting',
  pending_confirmation: 'Pending Confirmation',
  historical_listing: 'Historical Listing',
  applications_closed: 'Applications Closed',
};

const APPLY_METHOD_LABEL = {
  email: 'Apply by email',
  in_person: 'Apply in person',
  external_link: 'Apply on their site',
};

export default async function CompanyProfilePage({ params }) {
  const [company, reviewsRes] = await Promise.all([
    getCompanySSR(params.id),
    getCompanyReviewsSSR(params.id),
  ]);

  if (!company) notFound();
  const reviews = reviewsRes?.data || [];
  const isAccepting = company.status === 'currently_accepting';
  const showAlternateApply = isAccepting && company.apply_method && company.apply_method !== 'platform';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {company.logo_url && (
            <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-gray-100">
              <Image src={company.logo_url} alt={company.name} fill className="object-cover" sizes="64px" />
            </div>
          )}
          <div>
            <h1 className="font-heading text-2xl font-bold">{company.name}</h1>
            <p className="text-gray-500">{company.industry}</p>
            {(company.city || company.state) && (
              <p className="text-gray-400 text-sm mt-1">
                {[company.address, company.city, company.state].filter(Boolean).join(', ')}
              </p>
            )}
            <p className="text-sm mt-2">
              <span className="text-primary font-medium">{STATUS_LABEL[company.status] || company.status}</span>
              {' · '}
              ★ {company.avg_rating || '—'} ({company.review_count} review{company.review_count === '1' ? '' : 's'})
            </p>
          </div>
        </div>

        <CompanyProfileActions companyId={company.id} status={company.status} applyMethod={company.apply_method} />
      </div>

      {showAlternateApply && (
        <div className="card mt-6 border-primary/30">
          <h2 className="font-heading font-semibold mb-2">
            {APPLY_METHOD_LABEL[company.apply_method] || 'How to apply'}
          </h2>

          {company.apply_method === 'email' && company.apply_email && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                This company isn&apos;t managing applications through Silver Link yet — send your CV directly.
              </p>
              <a
                href={`mailto:${company.apply_email}?subject=${encodeURIComponent(`SIWES Application — ${company.name}`)}`}
                className="btn-primary text-sm py-2 inline-block"
              >
                Send your CV to {company.apply_email}
              </a>
            </div>
          )}

          {company.apply_method === 'in_person' && company.apply_instructions && (
            <p className="text-sm text-gray-600 whitespace-pre-line">{company.apply_instructions}</p>
          )}

          {company.apply_method === 'external_link' && company.apply_url && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                This company handles applications on their own site.
              </p>
              <a
                href={company.apply_url}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary text-sm py-2 inline-block"
              >
                Apply on their site →
              </a>
            </div>
          )}
        </div>
      )}

      {company.description && (
        <div className="card mt-6">
          <h2 className="font-heading font-semibold mb-2">About</h2>
          <p className="text-gray-600 text-sm whitespace-pre-line">{company.description}</p>
        </div>
      )}

      {company.departments?.length > 0 && (
        <div className="card mt-6">
          <h2 className="font-heading font-semibold mb-3">Accepted Departments</h2>
          <div className="flex flex-wrap gap-2">
            {company.departments.map((d) => (
              <span key={d} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card mt-6">
        <h2 className="font-heading font-semibold mb-3">Student Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-sm">No reviews yet — be the first to share your experience.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm">{r.student_name}</p>
                  <p className="text-sm">★ {r.overall_rating}/5</p>
                </div>
                {r.comment && <p className="text-sm text-gray-600 mt-1">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
