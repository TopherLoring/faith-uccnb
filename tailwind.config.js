/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#FFFFFF', deep: '#EAEAEA', line: '#DCDCDC' },
        ink: { DEFAULT: '#2E2E2E', soft: '#585858', mute: '#666666' },
        clay: { DEFAULT: '#3E7443', dark: '#335B38', light: '#DCE9DD' },
        moss: { DEFAULT: '#00729A', light: '#DCECF1' },
        blue: { DEFAULT: '#00729A', logo: '#007FAC' },
        ribbon: {
          red: '#E22726',
          orange: '#F7A660',
          yellow: '#FFDE16',
          green: '#5AA761',
          blue: '#007FAC',
          violet: '#7A3C87',
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
