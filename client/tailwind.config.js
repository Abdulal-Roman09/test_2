/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#0d0806',
          900: '#17100b',
          850: '#221811',
          800: '#2e2017',
          700: '#453023',
          600: '#614432',
          500: '#7d5c45',
        },
        cream: {
          50: '#fefcf8',
          100: '#f8f4ec',
          200: '#eee6d5',
          300: '#dfd2b8',
          400: '#ccb997',
        },
        gold: {
          300: '#f5d58f',
          400: '#e8be62',
          500: '#cf982b',
          600: '#ab761b',
          700: '#855812',
        },
        roast: {
          amber: '#d97706',
          clay: '#9a3412',
          bark: '#3e2723',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)",
        'coffee-gradient': "linear-gradient(180deg, rgba(13, 8, 6, 0.7) 0%, rgba(23, 16, 11, 0.95) 100%)",
      },
      boxShadow: {
        'artisanal': '0 10px 30px -10px rgba(13, 8, 6, 0.25)',
        'glow-gold': '0 0 25px -5px rgba(207, 152, 43, 0.35)',
        'inner-warm': 'inset 0 1px 2px rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
