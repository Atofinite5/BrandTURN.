/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      fontFamily: {
        display: ["Raleway", "sans-serif"],
        body: ["Raleway", "sans-serif"],
        tangerine: ["Tangerine", "cursive"],
    fraunces: ["Fraunces", "serif"],
    lobster: ["Lobster", "cursive"],
    raleway: ["Raleway", "sans-serif"],
    greatvibes: ["Great Vibes", "cursive"],
    didot: ["Didot", "serif"]
  
    }},
  },
  plugins: [],
};