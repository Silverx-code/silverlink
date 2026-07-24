'use client';

// The two interlocking rounded squares from Logo, gently drifting apart and back
// together — reads as "connecting" rather than a generic spinner ring, so every
// wait state in the product reinforces the brand mark instead of using a shape
// with no relationship to it.
export default function BrandSpinner({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="8" y="8" width="16" height="16" rx="8"
        stroke="#1E4FD8" strokeWidth="3"
        className="motion-safe:animate-link-loop"
      />
      <rect
        x="16" y="16" width="16" height="16" rx="8"
        stroke="#FFB238" strokeWidth="3"
        className="motion-safe:animate-link-loop"
        style={{ animationDelay: '0.15s', animationDirection: 'reverse' }}
      />
    </svg>
  );
}
