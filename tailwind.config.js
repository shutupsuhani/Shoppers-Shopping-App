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
  plugins: [
    function({ addUtilities }) {
    const newUtilities = {
        '.no-scrollbar': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
          '&::-webkit-scrollbar': {
            width: '0px', /* WebKit */
            background: 'transparent',
          },
        },
        
    }
    addUtilities(newUtilities)
  },
],
}

