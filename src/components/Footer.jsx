import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Silver Link</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-gray-600">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
