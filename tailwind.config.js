/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['Fraunces', 'Georgia', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        // Alias kept so existing `font-inter` usages resolve to the brand font.
        inter: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#0C3A30',
          greenDark: '#072620',
          gold: '#C8A45A',
          cream: '#F7F5F0',
        },
      },
    },
  },
  plugins: [],
}
