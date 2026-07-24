'use client';

import BrandSpinner from './BrandSpinner';

// Compact spinner for inline use (buttons, small panels) where a full LoadingScreen
// would be too heavy — e.g. a ChatPanel connecting, or a card refreshing in place.
export default function InlineSpinner({ size = 20, className = '' }) {
  return <BrandSpinner size={size} className={className} />;
}
