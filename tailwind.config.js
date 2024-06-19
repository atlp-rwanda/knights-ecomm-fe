/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'custom-primary': '#070f2b',
        'custom-secondary': '#AAB9C5'
      }
    }
  },
  plugins: []
};
