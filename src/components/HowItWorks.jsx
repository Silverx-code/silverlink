const ROLES = [
  {
    label: 'Students',
    title: 'Build a profile, apply in minutes',
    copy: 'Add your department and preferred location once. See only companies actually accepting SIWES students right now, and message them directly once you apply.',
    icon: (
      <path
        d="M12 3 2 8l10 5 10-5-10-5Zm0 7v9m-7-6v4c0 1 3 3 7 3s7-2 7-3v-4"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
    text: 'text-primary',
    chip: 'bg-primary/10',
    top: 'bg-primary',
    tint: 'bg-primary/[0.04]',
    ring: 'ring-primary/15',
  },
  {
    label: 'Companies',
    title: 'List openings, review applicants fast',
    copy: 'Set your acceptance status, post the roles you have room for, and review student applications with department and CV attached — no email back-and-forth.',
    icon: (
      <path
        d="M4 21V9l8-5 8 5v12M9 21v-6h6v6M4 21h16"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
    text: 'text-accent-dark',
    chip: 'bg-accent/15',
    top: 'bg-accent',
    tint: 'bg-accent/[0.06]',
    ring: 'ring-accent/20',
  },
  {
    label: 'Coordinators',
    title: 'See placements across your department',
    copy: 'Track which students have secured placements, flag ones still searching, and reach out to verified host companies on their behalf.',
    icon: (
      <path
        d="M9 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10-2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3 20v-1a5 5 0 0 1 5-5m6 6v-1a4.5 4.5 0 0 1 4-4.47"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
    text: 'text-success',
    chip: 'bg-success/10',
    top: 'bg-success',
    tint: 'bg-success/[0.05]',
    ring: 'ring-success/20',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-silver-light/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl">
          <span className="eyebrow">One directory, three sides</span>
          <h2 className="mt-3 font-heading font-bold text-2xl sm:text-3xl text-ink">
            Built around how a placement actually happens.
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((role) => (
            <div
              key={role.label}
              className={`relative overflow-hidden rounded-2xl ${role.tint} ring-1 ${role.ring} p-6
                          hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200`}
            >
              <span className={`absolute top-0 left-0 right-0 h-1.5 ${role.top}`} />
              <span className={`inline-flex w-11 h-11 items-center justify-center rounded-xl ${role.chip} ${role.text}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{role.icon}</svg>
              </span>
              <span className={`block mt-4 font-mono text-xs uppercase tracking-[0.2em] ${role.text}`}>
                {role.label}
              </span>
              <h3 className="mt-2 font-heading font-semibold text-lg text-ink leading-snug">
                {role.title}
              </h3>
              <p className="mt-2 text-sm text-silver-dark leading-relaxed">{role.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}