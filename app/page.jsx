import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary to-primary-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
            Find your SIWES placement, faster.
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
            SilverLink connects Nigerian students to companies that actually accept SIWES
            students — filtered by department, location, and status.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register" className="bg-white text-primary font-medium px-6 py-3 rounded-xl">
              Create your profile
            </Link>
            <Link href="/companies" className="border border-white/60 px-6 py-3 rounded-xl">
              Browse companies
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { title: 'Smart Search', desc: 'Filter by department, industry, state, city, and application status.' },
          { title: 'Verified Companies', desc: 'Companies claim and verify their profile so listings stay accurate.' },
          { title: 'Real Student Reviews', desc: 'See training quality, mentorship, and allowance info before you apply.' },
        ].map((f) => (
          <div key={f.title} className="card">
            <h3 className="font-heading font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
