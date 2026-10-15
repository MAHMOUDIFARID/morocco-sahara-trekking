import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 60% Dominant: Backgrounds, canvas, negative space
        canvas: {
          DEFAULT: "#FBF9F5",
          pure: "#FFFFFF",
          subtle: "#F5F1E9",
        },
        // 30% Structure: Typography, borders, dividers, secondary elements
        structure: {
          DEFAULT: "#1C1917",
        },
        // 10% Action: Focal CTAs, critical badges, interactive active states
        accent: {
          DEFAULT: "#C7482D",
          hover: "#B63E24",
        },
      },
      scale: {
        102: "1.02",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(28, 25, 23, 0.04), 0 1px 2px -1px rgba(28, 25, 23, 0.04)",
        card: "0 4px 20px -2px rgba(28, 25, 23, 0.04), 0 2px 6px -1px rgba(28, 25, 23, 0.02)",
        elevated: "0 10px 30px -4px rgba(28, 25, 23, 0.06), 0 4px 10px -2px rgba(28, 25, 23, 0.03)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        mono: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
