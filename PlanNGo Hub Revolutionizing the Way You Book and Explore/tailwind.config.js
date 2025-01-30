/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/app/tour/component/**/*.{html,ts}",
    "./src/app/authentication/component/**/*.{html,ts}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
