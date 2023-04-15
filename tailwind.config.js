/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#6379F4",
        "grey-primary": "#3A3D42",
        "grey-secondary": "#3A3D4299",
        "grey-thirty": "#DADADA",
        "white-primary": "#ffffff",
        "white-secondary": "#E5E5E5",
        danger: "#FF5B37",
      },
    },
  },
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [require("daisyui")],
};
