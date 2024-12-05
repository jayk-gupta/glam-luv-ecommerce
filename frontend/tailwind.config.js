/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: " #E80071",
        secondary: "#FFEAF6",

        // #F0BABF #F7E0E2
      },
      fontFamily: {
        logoFont: ["Niconne", "cursive"],
      },
      boxShadow: {
        xl: "0 1px 30px -10px rgba(232, 0, 113, 0.3)",
      },
    },
  },
  plugins: [],
};
