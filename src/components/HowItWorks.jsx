'use client';

import { useEffect, useRef, useState } from 'react';

// Same three sides as the Hero, but here shown as a left-to-right flow through
// the centre "match" — reusing the Hero's node/line language instead of an
// unrelated card-grid pattern, since the content is a real connected process,
// not three independent features.
const STEPS = [
  {
    id: 'student',
    label: 'Students',
    title: 'Build a profile, apply in minutes',
    copy: 'Add your department and preferred location once. See only companies actually accepting SIWES students right now, and message them directly once you apply.',
    color: '#1E4FD8',
    icon: (
      <path
        d="M12 3 2 8l10 5 10-5-10-5Zm0 7v9m-7-6v4c0 1 3 3 7 3s7-2 7-3v-4"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
  },
  {
    id: 'match',
    label: 'SilverLink',
    title: 'One verified directory in the middle',
    copy: 'Every listing is checked, every status is current. The directory is the single source of truth both sides actually trust.',
    color: '#0B1229',
    icon: (
      <path
        d="M13 15.5C13 12.462 15.462 10 18.5 10H21M27 24.5C27 27.538 24.538 30 21.5 30H19"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="translate(-4,-6) scale(0.9)"
      />
    ),
  },
  {
    id: 'company',
    label: 'Companies & coordinators',
    title: 'Review applicants, track placements',
    copy: 'Companies set acceptance status and review CVs with no email back-and-forth. Coordinators see who in their department is placed and who still needs help.',
    color: '#FFB238',
    icon: (
      <path
        d="M4 21V9l8-5 8 5v12M9 21v-6h6v6M4 21h16"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const show = reducedMotion || revealed;

  return (
    <section ref={sectionRef} className="bg-page relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-xl">
          <span className="eyebrow">One directory, three sides</span>
          <h2 className="mt-3 font-heading font-bold text-2xl sm:text-3xl text-ink">
            Built around how a placement actually happens.
          </h2>
        </div>

        {/* Connecting line — sits behind the row of steps, drawn left to right */}
        <div className="relative mt-14">
          <svg
            className="hidden lg:block absolute top-9 left-0 w-full h-2 overflow-visible"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <line
              x1="8" y1="1" x2="92" y2="1"
              pathLength="1"
              stroke="#AAB8CC"
              strokeOpacity="0.5"
              strokeWidth="0.5"
              style={{
                strokeDasharray: 1,
                strokeDashoffset: show ? 0 : 1,
                transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s',
              }}
            />
          </svg>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 relative">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                className="relative"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease-out ${i * 0.18}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.18}s`,
                }}
              >
                {/* node marker sitting on the connecting line */}
                <span
                  className="hidden lg:flex absolute -top-[3.15rem] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-page"
                  style={{ backgroundColor: step.color }}
                />
                <div className="rounded-2xl bg-white ring-1 ring-silver/15 p-6 h-full shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 ease-out">
                  <span
                    className="inline-flex w-11 h-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${step.color}1A`, color: step.color }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">{step.icon}</svg>
                  </span>
                  <span
                    className="block mt-4 font-mono text-xs uppercase tracking-[0.2em]"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </span>
                  <h3 className="mt-2 font-heading font-semibold text-lg text-ink leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-silver-dark leading-relaxed">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
