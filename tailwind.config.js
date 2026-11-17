/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#F5EFE6', deep: '#EDE4D6', line: '#DDD1BF' },
        ink: { DEFAULT: '#1D1B18', soft: '#4A453E', mute: '#6E675D' },
        clay: { DEFAULT: '#B4472A', dark: '#8F3720', light: '#F0D6C9' },
        moss: { DEFAULT: '#22382C', light: '#DCE5DD' },
        ribbon: {
          red: '#D9483B',
          orange: '#E8873A',
          yellow: '#E7BC3F',
          green: '#4C9459',
          blue: '#3C6DB0',
          violet: '#7A4E9F',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1320px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
