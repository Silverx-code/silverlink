import Link from 'next/link';
import Image from 'next/image';

const STATUS = {
  currently_accepting: { text: 'Currently Accepting', border: 'border-l-success', tone: 'bg-success/10 text-success', pulse: true },
  pending_confirmation: { text: 'Pending Confirmation', border: 'border-l-warning', tone: 'bg-warning/10 text-warning', pulse: false },
  historical_listing: { text: 'Historical Listing', border: 'border-l-silver', tone: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300', pulse: false },
  applications_closed: { text: 'Applications Closed', border: 'border-l-danger', tone: 'bg-danger/10 text-danger', pulse: false },
};

export default function CompanyCard({ company }) {
  const status = STATUS[company.status] || STATUS.historical_listing;
  const location = [company.city, company.state].filter(Boolean).join(', ') || 'N/A';
  const typeLabel = company.listing_type ? company.listing_type.replace(/_/g, ' ') : 'Placement';

  return (
    <Link
      href={`/companies/${company.id}`}
      className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900/70`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,79,216,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,178,56,0.10),transparent_30%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-slate-100 text-2xl font-heading font-bold text-primary ring-1 ring-slate-200 transition-transform duration-300 group-hover:scale-[1.04] dark:bg-slate-800 dark:ring-slate-700">
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
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{company.industry || 'Industry unavailable'}</p>
            </div>
          </div>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.tone} border-current`}>{status.text}</span>
        </div>

        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {company.description || company.tagline || `Explore placement opportunities with ${company.name}.`}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">{typeLabel}</span>
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">{location}</span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">View details</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all duration-200 group-hover:bg-primary/20">
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="stroke-current">
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
