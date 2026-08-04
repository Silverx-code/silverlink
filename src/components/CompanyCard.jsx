import Link from 'next/link';
import Image from 'next/image';

// Same four statuses as before, but expressed as a dot + label instead of a
// solid colour pill, and mapped to the design system's actual status colours
// (success/warning/silver/danger) rather than one-off hex values.
const STATUS = {
  currently_accepting: { text: 'Currently Accepting', dot: 'bg-success', border: 'border-l-success', pulse: true },
  pending_confirmation: { text: 'Pending Confirmation', dot: 'bg-warning', border: 'border-l-warning', pulse: false },
  historical_listing: { text: 'Historical Listing', dot: 'bg-silver-dark', border: 'border-l-silver', pulse: false },
  applications_closed: { text: 'Applications Closed', dot: 'bg-danger', border: 'border-l-danger', pulse: false },
};

// Deliberately not marked 'use client' — this renders fine as a Server Component,
// which means company cards on the directory page are part of the server-rendered
// HTML rather than something crawlers have to wait on client JS to paint.
export default function CompanyCard({ company }) {
  const status = STATUS[company.status] || STATUS.historical_listing;

  return (
    <Link
      href={`/companies/${company.id}`}
      className={`card group flex flex-col sm:flex-row gap-4 border-l-4 ${status.border} overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30 dark:hover:border-primary/40`}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-silver-light ring-1 ring-silver/20 transition-transform duration-200 group-hover:scale-105 dark:bg-slate-800 dark:ring-slate-700">
        {company.logo_url ? (
          <Image src={company.logo_url} alt={company.name} fill className="object-cover" sizes="56px" />
        ) : (
          <span className="text-primary font-heading font-bold text-lg">{company.name?.[0]}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="truncate font-heading font-semibold text-ink transition-colors group-hover:text-primary dark:text-slate-100">
            {company.name}
          </h3>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-silver-dark dark:text-slate-400">
            <span className="relative flex w-2 h-2">
              {status.pulse && (
                <span className={`absolute inline-flex w-full h-full rounded-full ${status.dot} opacity-60 animate-pulse-line`} />
              )}
              <span className={`relative inline-flex w-2 h-2 rounded-full ${status.dot}`} />
            </span>
            {status.text}
          </span>
        </div>
        <p className="mt-1 text-sm text-silver-dark dark:text-slate-400">{company.industry}</p>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {company.listing_type && company.listing_type !== 'siwes' && (
            <span className="text-xs text-silver-dark capitalize font-mono">{company.listing_type}</span>
          )}
        </div>
        {(company.city || company.state) && (
          <p className="mt-1 flex items-center gap-1 text-sm text-silver-dark/80 dark:text-slate-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-60">
              <path
                d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {[company.city, company.state].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    </Link>
  );
}
