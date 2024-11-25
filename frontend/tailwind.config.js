/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "",
        primary: "#2962FF",
        background: "#FFFFFF",
        dark: "#0D0D0D",
        light: "#F8FAFC",
        grey: "#BFBFBF",
        lightGrey: "#D6D6D6",
      },
    },
  },
  plugins: [],
};
