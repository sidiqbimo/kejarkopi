/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coffee-brown': '#6F4E37',
        'cream': '#F5F0E1',
        'latte': '#CBB99D',
        'matcha-green': '#8BA888',
        'error-red': '#D9534F',
        'text-dark': '#2D2D2D',
        'hint': '#A89F94',
        'disabled': '#E1DAD2',
        'disabled-text': '#B3AAA0',
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
