/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    variants: {
      extend: {},
    },
    extend: {
      colors: {
        labelColor: "#303972",
        inputBorder: "#C1BBEB",
        inputColor: "#A098AE",
        btnBg: "#4D44B5"
      },
      backgroundImage: {

      },
    },
    container: {
      screens: {
        lt: "400px",
        sm: "600px",
        md: "728px",
        lg: "900px",
        xl: "992px",
      },
    },
  },
  plugins: [],
};
