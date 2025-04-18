/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#0082d8",
        "primary-outline": "#0082d836"
      },
      screens: {
        "xsm": "640px",
      },
      fontFamily: {
        // sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Tajawal', 'Amiri', 'Cairo', 'serif'],
      },
    },
  },
  plugins: [daisyui, tailwindScrollbarHide],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
