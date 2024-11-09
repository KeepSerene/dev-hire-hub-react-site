/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },

      gridTemplateColumns: {
        "60/40": "60% 38%",
      },
    },
  },
  plugins: [],
};
