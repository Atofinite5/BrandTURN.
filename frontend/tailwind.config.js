/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  fontFamily: {
    tangerine: ["Tangerine", "cursive"],
    fraunces: ["Fraunces", "serif"],
    lobster: ["Lobster", "cursive"],
    raleway: ["Raleway", "sans-serif"],
    greatvibes: ["Great Vibes", "cursive"]
  
    }},
  },
  plugins: [],
};