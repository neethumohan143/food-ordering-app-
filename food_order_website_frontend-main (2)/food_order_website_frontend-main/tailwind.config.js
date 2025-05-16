/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ruge': ['"Ruge Boogie"', 'cursive'], // Add Ruge Boogie as a font family
      },
    },
  },
  plugins: [],
}

