/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          neutral: "#212121",
          "neutral-focus": "#2f2f2f",
          primary: "#f2f2f2",
          "base-100": "#0a0a0a",
          "base-content": "#f2f2f2",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-text-case": "lowercase",
          "--btn-focus-scale": "0.95",
          "--border-btn": ".3rem",
        },
      },
    ],
  },
};
