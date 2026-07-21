/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
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
        'grid-fade': 'radial-gradient(circle at 1px 1px, rgba(30,79,216,0.14) 1px, transparent 0)',
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
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-line': 'pulse-line 2.4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
