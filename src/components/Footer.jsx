import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-silver/20 mt-16 bg-silver-light/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-silver-dark">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Logo size={22} />
          <p className="text-xs">© {new Date().getFullYear()} Silver Link. Built for Nigerian universities.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
