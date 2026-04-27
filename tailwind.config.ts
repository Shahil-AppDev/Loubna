import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rouge: {
          50:  "#fdf2f2",
          100: "#fde8e8",
          200: "#fbd5d5",
          300: "#f8b4b4",
          400: "#f48484",
          500: "#eb4f4f",
          600: "#d73030",
          700: "#C41E3A",
          800: "#8B1A1A", // Main brand red
          900: "#6B1414",
          950: "#3D0A0A",
        },
        or: {
          300: "#E8C96D",
          400: "#D4A843",
          500: "#C9A84C", // Main gold
          600: "#B8942E",
          700: "#9A7A22",
        },
        encre: {
          50:  "#F8F7F5", // Off-white background
          100: "#F2F0ED",
          200: "#E8E5E0",
          300: "#D4CFC8",
          400: "#B5AFA6",
          500: "#918A7F",
          600: "#7B736C",
          700: "#625D58",
          800: "#353230",
          900: "#1A1A1A",
          950: "#0A0A0A", // Near-black
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      spacing: {
        "nav": "80px",
      },
      animation: {
        "fade-in":       "fadeIn 0.6s ease-out forwards",
        "fade-up":       "fadeUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "scale-in":      "scaleIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 50%, #0A0A0A 100%)",
      },
      boxShadow: {
        "rouge-sm": "0 2px 8px rgba(139, 26, 26, 0.20)",
        "rouge-md": "0 4px 16px rgba(139, 26, 26, 0.25)",
        "rouge-lg": "0 8px 32px rgba(139, 26, 26, 0.30)",
        "or-sm":    "0 2px 8px rgba(201, 168, 76, 0.20)",
        "premium":  "0 20px 60px rgba(0, 0, 0, 0.12)",
      },
      maxWidth: {
        "site": "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
