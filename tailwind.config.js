/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c3bef7',
        'secondary': '#8a4fff',
        'tertiary': '#c4ff4f',
      },
      fontFamily: {
        comic: ['Comic Neue', 'cursive'],
      },
    },
  },
  plugins: [],
}