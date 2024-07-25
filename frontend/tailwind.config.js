/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        priblack: "#1A1A1A",
        secblack: "#282828",
        terblack: "#2A2A2A",
        lctxt: "#BDBEC2",
      },
    },
  },
  plugins: [],
};
