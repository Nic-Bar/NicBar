/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#3e4759",
        mediumBlue: "#6c7a8c",
        lightBlue: "#949ba6",
        salmon: "f2695c",
        almostBlack: "#0d0d0d",
      },
    },
  },
  plugins: [],
};
