/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      letterSpacing: {
        'extra-wide': '0.15em',
      }
    },
  },
  plugins: [],
}

