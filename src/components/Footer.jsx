import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-silver/20 bg-silver-light/40 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 text-sm text-silver-dark sm:flex-row sm:px-6 dark:text-slate-400">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Logo size={22} />
          <p className="text-xs">&copy; {new Date().getFullYear()} Silver Link. Built for Nigerian universities.</p>
          <p className="text-xs">Email: layifakunlesubomi@gmail.com</p>
          <p className="text-xs">Phone: +234 812593003</p>
        </div>
        <div className="flex gap-6">
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
