/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: '#FDF7F4',
          100: '#F9EEE7',
          200: '#F3DACD',
          300: '#EABFA9',
          400: '#DD9977',
          500: '#C25E34', // Brand primary
          600: '#A74A24',
          700: '#8A3819',
          800: '#6C2B14',
          900: '#4D1D0D',
        },
        twilight: {
          50: '#F0F4F8',
          100: '#E1E9F2',
          200: '#C3D3E5',
          300: '#9CB8D4',
          400: '#5D8DBB',
          500: '#1E3A5F', // Heritage blue
          600: '#182E4D',
          700: '#13233B',
          800: '#0E1A2B',
          900: '#09101C',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E5EDE7',
          200: '#CDDDD1',
          300: '#ACC4B3',
          400: '#7FA489',
          500: '#4A6B56', // Creation & Hill Country Cedar
          600: '#3D5846',
          700: '#304638',
          800: '#23342A',
          900: '#18241D',
        },
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5', // Soft alabaster surface
          200: '#F5EFE6',
          300: '#EDE3D2',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.92' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
