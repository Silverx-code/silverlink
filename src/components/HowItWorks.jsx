const ROLES = [
  {
    label: 'Students',
    title: 'Build a profile, apply in minutes',
    copy: 'Add your department and preferred location once. See only companies actually accepting SIWES students right now, and message them directly once you apply.',
    color: 'text-primary',
    ring: 'ring-primary/15',
  },
  {
    label: 'Companies',
    title: 'List openings, review applicants fast',
    copy: 'Set your acceptance status, post the roles you have room for, and review student applications with department and CV attached — no email back-and-forth.',
    color: 'text-accent-dark',
    ring: 'ring-accent/20',
  },
  {
    label: 'Coordinators',
    title: 'See placements across your department',
    copy: 'Track which students have secured placements, flag ones still searching, and reach out to verified host companies on their behalf.',
    color: 'text-silver-dark',
    ring: 'ring-silver/25',
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
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROLES.map((role) => (
            <div
              key={role.label}
              className={`card ring-1 ${role.ring} hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-6`}
            >
              <span className={`font-mono text-xs uppercase tracking-[0.2em] ${role.color}`}>
                {role.label}
              </span>
              <h3 className="mt-3 font-heading font-semibold text-lg text-ink leading-snug">
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
