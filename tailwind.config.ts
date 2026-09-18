import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf2f2",
          100: "#fbe0e0",
          200: "#f6c2c2",
          300: "#ec9494",
          400: "#dd5f5f",
          500: "#c62828",
          600: "#a91f1f",
          700: "#8a1a1a",
          800: "#6e1616",
          900: "#521010",
        },
        ink: {
          50: "#f5f6f7",
          100: "#e7e9eb",
          200: "#c5cad0",
          300: "#9aa2ab",
          400: "#6b7480",
          500: "#4d5560",
          600: "#3a414a",
          700: "#2b3038",
          800: "#1c1f24",
          900: "#101215",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
