import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%": { transform: "translate(-100%)" },
          "100%": { transform: "translate(0%)" },
        },
        loadingDots: {
          "0%": { content: "" },
          "33%": { content: "." },
          "66%": { content: ".." },
          "100%": { content: "..." },
        },
      },
      animation: {
        loading: "loading 3s linear",
        loadingDots: "loadingDots 1s linear infinite",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "pastel", "retro", "valentine"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
};
export default config;
