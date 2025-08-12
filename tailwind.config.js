/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Lato", "sans-serif"],
        secondary: ["Playfair Display", "serif"],
      },
      colors: {
        dark: "#232323",
        accent: "#94d0ef",
        warning: "#ffa561",
        error: "#ef3030",
      },
      screens: {
        'sm': '425px',
        'md': '768px', 
        'lg': '1200px',
      },
      letterSpacing: {
        wide: '3px',
        wider: '10px',
      },
      maxWidth: {
        'site': '1200px',
      },
      height: {
        '45': '11.25rem',
      },
      spacing: {
        '15': '3.75rem',
      }
    },
  },
  plugins: [],
}