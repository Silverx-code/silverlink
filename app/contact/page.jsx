export const metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="card space-y-6">
        <div>
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="font-heading text-2xl font-bold text-ink dark:text-slate-100">Contact Us</h1>
          <p className="mt-2 text-sm leading-relaxed text-silver-dark dark:text-slate-400">
            Have a question about Silver Link, company listings, or SIWES placement
            support? Reach out through the details below.
          </p>
        </div>

        <div className="space-y-3 text-sm text-silver-dark dark:text-slate-400">
          <p>
            <span className="font-semibold text-ink dark:text-slate-100">Email:</span>{' '}
            <a className="text-primary hover:text-primary-dark" href="mailto:layifakunlesubomi@gmail.com">
              layifakunlesubomi@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold text-ink dark:text-slate-100">Phone:</span>{' '}
            <a className="text-primary hover:text-primary-dark" href="tel:+234812593003">
              +234 812593003
            </a>
          </p>
        </div>

        <div className="border-t border-silver/20 pt-5 text-sm leading-relaxed text-silver-dark dark:border-slate-800 dark:text-slate-400">
          <p>
            If you want to know more about the owner of this site, visit{' '}
            <a
              className="font-medium text-primary hover:text-primary-dark"
              href="https://silverportfolio-rouge.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              the owner&apos;s portfolio
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
