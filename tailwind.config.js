//** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "sage": {
          DEFAULT: "#84a59d",
          light: "#a3c0b9",
          dark: "#6b8a82"
        },
        "almond": {
          DEFAULT: "#f7ede2",
          dark: "#e5be94",
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
