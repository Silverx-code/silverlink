// Brand mark: two rounded links (chain-link) interlocking to form the negative-space
// silhouette of an "S" — literalizes "Silver" (the link/chain metaphor) and "Link"
// (student <-> company connection) in one shape. Used in Navbar, Footer, LoadingScreen.
export default function Logo({ className = '', showWordmark = true, size = 32 }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="12" className="fill-primary" />
        <circle cx="14" cy="14" r="4" fill="white" />
        <circle cx="26" cy="26" r="4" fill="#FFB238" />
        <path d="M14 18L14 24" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M22 14H26" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M18 14L22 14" stroke="#FFB238" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M18 26L22 26" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M18 14C18 18 18 22 18 26" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M22 14C22 18 22 22 22 26" stroke="#FFB238" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      {showWordmark && (
        <span className="font-heading font-bold text-xl leading-none text-ink dark:text-slate-50">
          Silver<span className="text-primary">Link</span>
        </span>
      )}
    </span>
  );
}
