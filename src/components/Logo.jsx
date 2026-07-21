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
        <rect width="40" height="40" rx="11" className="fill-primary" />
        <path
          d="M13 15.5C13 12.462 15.462 10 18.5 10H21"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M27 24.5C27 27.538 24.538 30 21.5 30H19"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <rect x="10.5" y="12" width="9.5" height="9.5" rx="4.75" stroke="white" strokeWidth="2.6" />
        <rect x="20" y="18.5" width="9.5" height="9.5" rx="4.75" stroke="#FFB238" strokeWidth="2.6" />
      </svg>
      {showWordmark && (
        <span className="font-heading font-bold text-xl leading-none text-ink">
          Silver<span className="text-primary">Link</span>
        </span>
      )}
    </span>
  );
}
