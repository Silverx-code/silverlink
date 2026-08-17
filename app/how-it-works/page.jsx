import Link from 'next/link';

export const metadata = {
  title: 'How it works',
  description: 'Learn how to find, apply for, and track SIWES placements on Silver Link.',
};

const studentSteps = [
  ['1', 'Create your student account', 'Register with your school details, then add your department, level, and preferred location. A complete profile helps us show better matches.'],
  ['2', 'Browse relevant companies', 'Use the Companies page to search by department, state, city, industry, and application status. Open any listing with Learn more.'],
  ['3', 'Check how to apply', 'Each company profile clearly explains whether to apply through Silver Link, by email, in person, or on the company’s own website.'],
  ['4', 'Apply and follow up', 'For Silver Link applications, submit your optional note from the profile. Track the result in Applications and message the company when available.'],
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <section className="max-w-2xl">
        <p className="eyebrow">Guide</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-ink dark:text-slate-100 sm:text-4xl">How to use Silver Link</h1>
        <p className="mt-4 text-base leading-relaxed text-silver-dark dark:text-slate-400">Find SIWES placement opportunities, understand exactly how each company accepts applications, and keep track of your progress in one place.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-xl font-semibold text-ink dark:text-slate-100">For students</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {studentSteps.map(([number, title, copy]) => (
            <article key={number} className="card flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{number}</span>
              <div>
                <h3 className="font-heading font-semibold text-ink dark:text-slate-100">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-silver-dark dark:text-slate-400">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card mt-8 border-primary/25">
        <h2 className="font-heading text-xl font-semibold text-ink dark:text-slate-100">Know the application method</h2>
        <div className="mt-4 grid gap-4 text-sm leading-relaxed text-silver-dark dark:text-slate-400 sm:grid-cols-3">
          <p><strong className="text-ink dark:text-slate-100">Through Silver Link:</strong> select Apply on an open company profile. Your application status is visible in your dashboard.</p>
          <p><strong className="text-ink dark:text-slate-100">Email, in person, or external form:</strong> follow the instructions on the profile. These applications are handled outside Silver Link, so keep your own copy and follow up with the company.</p>
          <p><strong className="text-ink dark:text-slate-100">Not accepting:</strong> do not submit an application yet. Save the listing or contact the company to confirm when applications reopen.</p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card"><h2 className="font-heading font-semibold text-ink dark:text-slate-100">For companies</h2><p className="mt-2 text-sm leading-relaxed text-silver-dark dark:text-slate-400">Create or claim your company profile, add accepted departments and your application method, then review applications from your dashboard.</p></div>
        <div className="card"><h2 className="font-heading font-semibold text-ink dark:text-slate-100">Need help?</h2><p className="mt-2 text-sm leading-relaxed text-silver-dark dark:text-slate-400">If a listing is unclear or you need support, contact the Silver Link team.</p><Link href="/contact" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">Contact us →</Link></div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3"><Link href="/companies" className="btn-primary">Browse companies</Link><Link href="/register" className="btn-secondary">Create student account</Link></div>
    </div>
  );
}
