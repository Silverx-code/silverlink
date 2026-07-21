'use client';

// Compact spinner for inline use (buttons, small panels) where a full LoadingScreen
// would be too heavy — e.g. a ChatPanel connecting, or a card refreshing in place.
export default function InlineSpinner({ size = 20, className = '' }) {
  return (
    <div
      className={`border-2 border-silver/30 border-t-primary rounded-full animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
