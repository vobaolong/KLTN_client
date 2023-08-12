/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "400px": "400px",
        "800px": "800px",
        "1000px": "1050px",
        "1100px": "1110px",
        "1300px": "1300px",
      },
    },
  },
  plugins: [],
};
