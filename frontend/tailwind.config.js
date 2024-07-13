/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(38,38,38)",
        secondary: "rgb(46, 46, 46)",
      },
    },
  },
  plugins: [],
};
