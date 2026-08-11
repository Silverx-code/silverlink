import Link from 'next/link';
import Image from 'next/image';

const STATUS = {
  currently_accepting: { text: 'Currently Accepting', tone: 'border-success/40 bg-success/15 text-green-800 dark:border-success/40 dark:bg-success/20 dark:text-green-200' },
  pending_confirmation: { text: 'Pending Confirmation', tone: 'border-warning/50 bg-warning/20 text-amber-900 dark:border-warning/40 dark:bg-warning/20 dark:text-amber-100' },
  historical_listing: { text: 'Historical Listing', tone: 'border-slate-300 bg-slate-200 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100' },
  applications_closed: { text: 'Applications Closed', tone: 'border-danger/40 bg-danger/15 text-red-800 dark:border-danger/40 dark:bg-danger/20 dark:text-red-200' },
};

export default function CompanyCard({ company }) {
  const status = STATUS[company.status] || STATUS.historical_listing;
  const location = [company.city, company.state].filter(Boolean).join(', ') || 'N/A';
  const typeLabel = company.listing_type ? company.listing_type.replace(/_/g, ' ') : 'Placement';

  return (
    <article
      className="group relative overflow-hidden rounded-[2rem] border border-slate-300 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-primary/10 text-2xl font-heading font-bold text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-[1.04] dark:bg-slate-800 dark:text-blue-200 dark:ring-slate-600">
              {company.logo_url ? (
                <Image src={company.logo_url} alt={company.name} fill className="object-cover" sizes="64px" />
              ) : (
                <span>{company.name?.[0]}</span>
              )}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold leading-tight text-ink transition-colors duration-200 group-hover:text-primary dark:text-slate-100">
                {company.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">{company.industry || 'Industry unavailable'}</p>
            </div>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.tone}`}>{status.text}</span>
        </div>

        <p className="text-sm leading-6 text-slate-800 dark:text-slate-200">
          {company.description || company.tagline || `Explore placement opportunities with ${company.name}.`}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">{typeLabel}</span>
          <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">{location}</span>
        </div>

        {company.match_reasons?.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-slate-300 pt-4 dark:border-slate-700">
            {company.match_reasons.slice(0, 3).map((reason) => (
              <span
                key={reason}
                className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-blue-800 dark:border-primary/35 dark:bg-primary/20 dark:text-blue-100"
              >
                {reason}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">View details</span>
          <Link
            href={`/companies/${company.id}`}
            aria-label={`View details for ${company.name}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:ring-offset-slate-900"
          >
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
