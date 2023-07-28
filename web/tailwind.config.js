/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "darkbg" : "#121212"
      },

      animation: {
        'overlay-show': 'Overlay 1000ms cubic-bezier(0.16, 1, 0.3, 1)' 
      },

      keyframes: {
        Overlay: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
      
    },
  },
  plugins: [],
}
