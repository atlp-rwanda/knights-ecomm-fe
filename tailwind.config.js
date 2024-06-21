/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent1: '#EEF5FF',
        background: '#F0EEED',
        background3: '#EEF5FF',
        primary: '#070F2B',
        baseBlack: '#000000',
        baseWhite: '#FFFFFF',
        neutrals100: '#e3e3e3',
        neutrals200: '#cccbcb',
        neutrals300: '#b5b3b3',
        neutrals400: '#9F9C9C',
        neutrals500: '#898384',
        neutrals600: '#726C6C',
        neutrals700: '#5A5555',
        neutrals800: '#433E3F',
        neutrals900: '#2B2829',
        neutrals1000: '#151314',
        orange: '#FF4141',
        black1: '#000000',
        black2: 'rgba(0, 0, 0, 0.6)',
        grey1: '#C9C9C9',
        grey2: '#5C5C5C',
        grey3: '#C7C7C7'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
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
