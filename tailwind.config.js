//** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        "sage": {
          DEFAULT: "#84a59d",
          light: "#b2d2c0ff",
          dark: "#759189ff"
        },
        "almond": {
          DEFAULT: "#f7ede2",
          dark: "#e0a668ff",
          light: "#fbf6f1"
        }
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
      }
    }
  }
}
