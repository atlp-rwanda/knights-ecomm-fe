/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent1: '#EEF5FF',
        primary: '#070F2B',
        orange: '#FF4141',
        black1: '#252525',
        black2: 'rgba(0, 0, 0, 0.6)',
        grey1: '#C9C9C9',
        grey2: '#5C5C5C',
        grey3: '#C7C7C7'
      },
      boxShadow: {
        navbar: '0px 1px 3px -2px rgba(0, 0, 0, 1)' // Customize the rgba color value as needed
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite'
      }
    }
  },
  plugins: []
};
