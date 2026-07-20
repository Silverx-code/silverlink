import './globals.css';
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Default metadata for every page. Individual pages (notably company profiles)
// override this via their own generateMetadata — this is just the fallback.
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Silver Link — SIWES Placement Made Simple',
    template: '%s | Silver Link',
  },
  description: 'Find your SIWES placement faster. Browse companies that accept SIWES students, filtered by department, location, and application status.',
  openGraph: {
    type: 'website',
    siteName: 'Silver Link',
  },
  twitter: {
    card: 'summary',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-gray-50 text-silver-dark min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
