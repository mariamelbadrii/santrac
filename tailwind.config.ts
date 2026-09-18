import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    container: false,
    extend: {
      colors: {
        // Primary accent — used sparingly (CTAs, active states, key numerals).
        brand: {
          50: "#fdf2f2",
          100: "#fbe1e1",
          200: "#f6c3c3",
          300: "#ec9797",
          400: "#dd6666",
          500: "#c8102e", // primary CTA red
          600: "#b30f29",
          700: "#960f24",
          800: "#7a0f20",
          900: "#630f1d",
          950: "#38070f",
        },
        // Warm charcoal neutrals — the workhorse of the palette.
        ink: {
          0: "#ffffff",
          25: "#fbfaf9",
          50: "#f6f4f2",
          100: "#ece8e4",
          200: "#d8d1ca",
          300: "#b7ada2",
          400: "#8f8377",
          500: "#6b6055",
          600: "#4f463d",
          700: "#38322c",
          800: "#241f1b",
          900: "#171310",
          950: "#0c0a08",
        },
      },
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "IBM Plex Sans Arabic",
          "system-ui",
          "sans-serif",
        ],
        // Bold bilingual display face — Almarai natively covers Arabic
        // and Latin at the same weights, so hero statements feel equally
        // premium in both languages instead of Arabic getting a fallback.
        display: ["Almarai", "IBM Plex Sans Arabic", "system-ui", "sans-serif"],
        arabic: ["IBM Plex Sans Arabic", "IBM Plex Sans", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 7vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.75rem, 5.5vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.25rem, 3.6vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.75rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        widest2: "0.16em",
      },
      spacing: {
        13: "3.25rem",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        full: "9999px",
      },
      maxWidth: {
        container: "1280px",
        wide: "1440px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(23 19 16 / 0.04), 0 1px 6px -2px rgb(23 19 16 / 0.06)",
        "card-hover": "0 4px 16px -4px rgb(23 19 16 / 0.12)",
        panel: "0 8px 40px -12px rgb(23 19 16 / 0.18)",
        glow: "0 0 120px 20px rgb(200 16 46 / 0.25)",
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgb(12 10 8 / 1) 65%), linear-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
