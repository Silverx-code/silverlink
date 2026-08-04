/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand blue — "SilverLink Blue"
        primary: {
          DEFAULT: '#1E4FD8',
          dark: '#12309E',
          light: '#5C7EF0',
        },
        // The "Silver" half of the brand — cool grey-blue, never plain grey
        silver: {
          DEFAULT: '#AAB8CC',
          dark: '#5B6B85',
          light: '#EEF1F7',
        },
        ink: '#0B1229', // near-navy, used instead of pure black
        accent: {
          DEFAULT: '#FFB238', // amber — CTAs, highlights, "opportunity" moments
          dark: '#E0972A',
        },
        success: '#1FAF7A',
        warning: '#F0A93A',
        danger: '#E5533D',
        // NEW — the page's resting surface. Very slightly cool/tinted instead of
        // pure #FFFFFF, so white cards read as objects sitting on a surface rather
        // than white-on-white with almost no contrast.
        page: '#F7F8FC',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,41,0.04), 0 8px 24px -12px rgba(11,18,41,0.12)',
        'card-hover': '0 4px 10px rgba(11,18,41,0.06), 0 16px 32px -12px rgba(30,79,216,0.18)',
        glow: '0 0 0 1px rgba(30,79,216,0.08), 0 0 40px -8px rgba(30,79,216,0.35)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at 1px 1px, rgba(30,79,216,0.28) 1.5px, transparent 0)',
        // NEW — ambient page texture: tiny paired rounded-rect "links," echoing the
        // Logo mark, tiled very faintly across marketing surfaces instead of the
        // generic dot-grid pattern every other product uses.
        'link-grid':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cg fill='none' stroke='%23AAB8CC' stroke-opacity='0.4' stroke-width='2'%3E%3Crect x='8' y='8' width='16' height='16' rx='8'/%3E%3Crect x='32' y='32' width='16' height='16' rx='8'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-line': {
          '0%, 100%': { opacity: 0.25 },
          '50%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(18px,-18px,0)' },
        },
        'network-flow': {
          '0%': { transform: 'translateX(-8px) scale(0.98)' },
          '50%': { transform: 'translateX(8px) scale(1.02)' },
          '100%': { transform: 'translateX(-8px) scale(0.98)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(0.96)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        },
        // NEW — used with SVG `pathLength="1"` so any line/path can "draw itself
        // in" regardless of actual geometry. Drives the Hero connection lines and
        // the HowItWorks scroll reveal.
        'draw-line': {
          from: { strokeDashoffset: 1 },
          to: { strokeDashoffset: 0 },
        },
        // NEW — the two Logo links loosening and re-interlocking. Used as the
        // on-brand replacement for a generic spinner ring.
        'link-loop': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, -2px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-line': 'pulse-line 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        'network-flow': 'network-flow 16s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'draw-line': 'draw-line 1.1s cubic-bezier(0.16,1,0.3,1) both',
        'link-loop': 'link-loop 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
