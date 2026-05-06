import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper:        '#F2EBDD',
        'paper-warm': '#EDE3D0',
        'paper-light':'#F8F2E5',
        ink:          '#141414',
        'ink-soft':   '#2A2A2A',
        forest:       '#1B3A2F',
        'forest-deep':'#0F2620',
        amber:        '#E8A317',
        'amber-bright':'#F5B800',
        rust:         '#B85C2E'
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:    ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-plex-mono)', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
