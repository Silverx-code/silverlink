import Link from 'next/link';
import Image from 'next/image';

const STATUS_LABEL = {
  currently_accepting: { text: 'Currently Accepting', cls: 'badge-accepting' },
  pending_confirmation: { text: 'Pending Confirmation', cls: 'badge-pending' },
  historical_listing: { text: 'Historical Listing', cls: 'badge-historical' },
  applications_closed: { text: 'Applications Closed', cls: 'badge-closed' },
};

// Deliberately not marked 'use client' — this renders fine as a Server Component,
// which means company cards on the directory page are part of the server-rendered
// HTML rather than something crawlers have to wait on client JS to paint.
export default function CompanyCard({ company }) {
  const status = STATUS_LABEL[company.status] || STATUS_LABEL.historical_listing;

  return (
    <Link href={`/companies/${company.id}`} className="card flex gap-4 hover:shadow-md transition-shadow">
      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative">
        {company.logo_url ? (
          <Image src={company.logo_url} alt={company.name} fill className="object-cover" sizes="56px" />
        ) : (
          <span className="text-primary font-heading font-bold text-lg">{company.name?.[0]}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-heading font-semibold truncate">{company.name}</h3>
          <span className={status.cls}>{status.text}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{company.industry}</p>
        <div className="flex items-center gap-2 mt-1">
          {company.listing_type && company.listing_type !== 'siwes' && (
            <span className="text-xs text-gray-400 capitalize">{company.listing_type}</span>
          )}
        </div>
        {(company.city || company.state) && (
          <p className="text-sm text-gray-400 mt-1">
            {[company.city, company.state].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    </Link>
  );
}
