'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Nodes represent the three sides of the platform (students, companies, university
// coordinators) all resolving toward the centre "match" node. Position is expressed
// as a fraction of the canvas so it stays proportional at any size.
const NODES = [
  { id: 'student', label: 'Student', x: 0.14, y: 0.24, depth: 0.6, color: '#1E4FD8' },
  { id: 'company-1', label: 'Fintech Co.', x: 0.86, y: 0.16, depth: 0.9, color: '#1E4FD8' },
  { id: 'company-2', label: 'Logistics Co.', x: 0.9, y: 0.62, depth: 1.1, color: '#1E4FD8' },
  { id: 'company-3', label: 'Agritech Co.', x: 0.78, y: 0.88, depth: 0.7, color: '#1E4FD8' },
  { id: 'university', label: 'University', x: 0.1, y: 0.78, depth: 1.0, color: '#FFB238' },
];
const CENTER = { x: 0.5, y: 0.5 };

export default function Hero() {
  const containerRef = useRef(null);
  const frame = useRef(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [activeLine, setActiveLine] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Drives the one-time "connections forming" reveal on mount — lines and nodes
  // draw themselves in sequence rather than appearing all at once, since that
  // sequence is the actual pitch: unconnected sides resolving into a match.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    // Kick the reveal on next frame so the draw-in animation actually plays
    // instead of the browser painting the end state immediately.
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const id = setInterval(() => {
      setActiveLine((i) => (i + 1) % NODES.length);
    }, 1800);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setPointer({ x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) });
    });
  };

  const handleMouseLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    setPointer({ x: 0.5, y: 0.5 });
  };

  // Offset a node's position by the pointer, scaled by its "depth" for parallax.
  const project = (node) => {
    const driftX = (pointer.x - 0.5) * 0.05 * node.depth;
    const driftY = (pointer.y - 0.5) * 0.05 * node.depth;
    return { x: node.x + driftX, y: node.y + driftY };
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-silver-light/60 to-page dark:from-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 bg-link-grid opacity-60 pointer-events-none dark:opacity-30" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8 lg:py-28">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="eyebrow">SIWES &amp; internship placement</span>
          <h1 className="mt-4 font-heading font-bold text-4xl leading-[1.05] text-ink text-balance sm:text-5xl lg:text-[3.4rem] dark:text-slate-50">
            Where students meet the companies ready to train them.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-silver-dark sm:text-lg dark:text-slate-300">
            SilverLink connects Nigerian university students, host companies, and
            coordinators on one verified directory — so finding a placement isn't
            about who you know.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/register" className="btn-primary">
              Find a placement
            </Link>
            <Link href="/register/company" className="btn-secondary">
              List your company
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-silver-dark dark:text-slate-400">
            <span><strong className="text-ink text-sm">10+</strong> companies listed</span>
            <span><strong className="text-ink text-sm">3</strong> states covered</span>
            <span><strong className="text-ink text-sm">Free</strong> for students</span>
          </div>
        </div>

        {/* Mouse-reactive connection map */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto aspect-square w-full max-w-lg select-none rounded-[2rem] border border-primary/10 bg-white/50 p-4 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 sm:aspect-[4/3] lg:aspect-square"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* connection lines — draw themselves in on mount, staggered per node */}
            {NODES.map((node, i) => {
              const p = project(node);
              const isActive = i === activeLine;
              return (
                <line
                  key={`line-${node.id}`}
                  x1={CENTER.x * 100}
                  y1={CENTER.y * 100}
                  x2={p.x * 100}
                  y2={p.y * 100}
                  pathLength="1"
                  stroke={isActive ? node.color : '#AAB8CC'}
                  strokeOpacity={isActive ? 0.9 : 0.35}
                  strokeWidth={isActive ? 0.6 : 0.35}
                  className={isActive ? 'animate-pulse-line' : ''}
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          strokeDasharray: 1,
                          strokeDashoffset: revealed ? 0 : 1,
                          transition: `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                        }
                  }
                />
              );
            })}

            {/* centre "you" node */}
            <circle cx={CENTER.x * 100} cy={CENTER.y * 100} r="4.2" className="fill-ink" />
            <circle
              cx={CENTER.x * 100}
              cy={CENTER.y * 100}
              r="7.5"
              fill="none"
              stroke="#0B1229"
              strokeOpacity="0.15"
              strokeWidth="0.5"
            />

            {/* orbit nodes — fade/scale in just after their line finishes drawing */}
            {NODES.map((node, i) => {
              const p = project(node);
              return (
                <g
                  key={node.id}
                  transform={`translate(${p.x * 100} ${p.y * 100})`}
                  style={{
                    transition: reducedMotion
                      ? 'transform 0.15s ease-out'
                      : `transform 0.15s ease-out, opacity 0.4s ease-out ${0.5 + i * 0.12}s, transform-origin 0s`,
                    opacity: reducedMotion ? 1 : revealed ? 1 : 0,
                  }}
                >
                  <circle r="3.2" fill={node.color} className={reducedMotion ? '' : 'animate-float'} />
                  <circle r="5.4" fill="none" stroke={node.color} strokeOpacity="0.25" strokeWidth="0.4" />
                </g>
              );
            })}
          </svg>

          {/* HTML labels layered over the SVG, positioned to match node coordinates */}
          {NODES.map((node, i) => {
            const p = project(node);
            return (
              <div
                key={`label-${node.id}`}
                className="absolute -translate-x-1/2 translate-y-3 font-mono text-[10px] sm:text-xs text-silver-dark whitespace-nowrap pointer-events-none transition-[left,top] duration-150 ease-out"
                style={{
                  left: `${p.x * 100}%`,
                  top: `${p.y * 100}%`,
                  opacity: reducedMotion ? 1 : revealed ? 1 : 0,
                  transition: `left 0.15s ease-out, top 0.15s ease-out, opacity 0.4s ease-out ${0.6 + i * 0.12}s`,
                }}
              >
                {node.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
