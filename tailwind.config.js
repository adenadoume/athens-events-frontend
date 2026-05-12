/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#08080f',
          surface: '#0f0f1a',
          card: '#131320',
          'card-hover': '#1a1a2e',
        },
        accent: {
          purple: '#7c3aed',
          cyan: '#06b6d4',
          pink: '#ec4899',
          green: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 12px 48px rgba(124,58,237,0.25)',
        'glow': '0 0 20px rgba(124,58,237,0.4)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'spin-slow': 'spin 1s linear infinite',
      },
      keyframes: {
        shimmer: {
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
}
