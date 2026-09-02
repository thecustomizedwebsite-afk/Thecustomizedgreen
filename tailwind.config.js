/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        forest: {
          50: '#f0f7f1',
          100: '#dbeee0',
          200: '#bae0c4',
          300: '#8acca0',
          400: '#56b078',
          500: '#34945c',
          600: '#247648',
          700: '#1d5e3b',
          800: '#194b31',
          900: '#143d28',
          950: '#0a2217',
        },
        sage: {
          50: '#f5f8f5',
          100: '#e8f0e8',
          200: '#d0e0d2',
          300: '#aac6ad',
          400: '#7fa784',
          500: '#5d8a63',
          600: '#486f4d',
          700: '#3a593f',
          800: '#304834',
          900: '#283b2c',
        },
        earth: {
          50: '#faf6f0',
          100: '#f3e9d8',
          200: '#e6d0b5',
          300: '#d4b085',
          400: '#c0915c',
          500: '#a87842',
          600: '#8e6136',
          700: '#744d2e',
          800: '#5f3e28',
          900: '#4e3322',
        },
        sand: {
          50: '#fbfaf8',
          100: '#f4f1ec',
          200: '#e9e3d8',
          300: '#d6ccba',
          400: '#b8a98e',
          500: '#9c8a6b',
        },
        cream: '#faf8f3',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in-up': 'fadeUp 0.7s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'grow': 'grow 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        grow: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
      },
    },
  },
  plugins: [],
};
