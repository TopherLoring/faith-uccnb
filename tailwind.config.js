/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        terracotta: {
          50: '#FDF7F4',
          100: '#FAEEE8',
          200: '#F4DBCF',
          300: '#EABFB0',
          400: '#DC9680',
          500: '#B84B28', // Earthy Texas terracotta
          600: '#9E3E1F',
          700: '#823117',
          800: '#672410',
          900: '#4D1A0B',
        },
        twilight: {
          50: '#F0F4F9',
          100: '#E2EAF3',
          200: '#C5D4E6',
          300: '#9DB6D4',
          400: '#658BB9',
          500: '#16273E', // Sacred river navy
          600: '#122033',
          700: '#0E1827',
          800: '#0A111C',
          900: '#060A11',
          950: '#04070B',
        },
        cedar: {
          50: '#F3F7F5',
          100: '#E5ECE7',
          200: '#CDDAD1',
          300: '#A9C0B1',
          400: '#6F977B',
          500: '#335340', // Hill Country cedar & creation
          600: '#2A4535',
          700: '#21362A',
          800: '#18271E',
          900: '#0F1913',
        },
        sage: {
          50: '#F3F7F5',
          100: '#E5ECE7',
          200: '#CDDAD1',
          300: '#A9C0B1',
          400: '#6F977B',
          500: '#335340', // Hill Country cedar & creation
          600: '#2A4535',
          700: '#21362A',
          800: '#18271E',
          900: '#0F1913',
        },
        limestone: {
          50: '#FDFBF7', // Warm limestone alabaster
          100: '#F7F2EB',
          200: '#EFE6DA',
          300: '#DFCFC0',
          400: '#C7B29D',
          500: '#A58B71',
          600: '#876E55',
        },
        alabaster: {
          50: '#FDFBF7',
          100: '#F7F2EB',
          200: '#EFE6DA',
        },
        sand: {
          50: '#FDFBF7', // Limestone alabaster
          100: '#F5EFE8',
          200: '#E8DFD5',
          300: '#D6C8B8',
          400: '#B5A28D',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FDFBF7',
          200: '#F5EFE8',
          300: '#EAE1D4',
        },
        pride: {
          red: '#E11D48',
          orange: '#EA580C',
          gold: '#EAB308',
          green: '#16A34A',
          blue: '#2563EB',
          purple: '#7C3AED',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        'prose-narrow': '65ch',
        'prose-wide': '85ch',
        'content': '1440px',
        'ultra': '1800px',
      }
    },
  },
  plugins: [],
}
