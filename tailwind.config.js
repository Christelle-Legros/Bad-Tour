/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gunmetal: "#2b303aff",
        "electric-blue": "#2DE6FE",
        "lavender-blush": "#eee5e9ff",
        gray: "#7c7c7cff",
        "chili-red": "#d64933ff",
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
        morning: ['"Morning Routine"', "cursive"],
      },
    },
  },
  plugins: [],
};
