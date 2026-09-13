import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10182B",
        blue: { DEFAULT: "#1E3FBF", deep: "#132B85" },
        soft: "#EAF0FE",
        stone: "#F6F7FB",
        line: "#DDE3F0",
        muted: "#5B6478",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: { site: "1180px" },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "6.5": "1.625rem",
        "7.5": "1.875rem",
        "8.5": "2.125rem",
        "11.5": "2.875rem",
        "13": "3.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
