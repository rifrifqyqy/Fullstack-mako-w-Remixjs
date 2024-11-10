import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // buatkan set color
      colors: {
        // primari berisi kode angka misal 100 200 300
        primary: {
          100: "#8e1538",
          200: "#6c0a3e",
          300: "#4a0d45",
        },
        // buatkan set untuk dark
        dark: {
          100: "#2c2c2c",
          200: "#1f1f1f",
          300: "#111111",
        },
        // buatkan set untuk light color sampai 600
        light: {
          100: "#f7f7f7",
          200: "#e5e5e5",
          300: "#d3d3d3",
          400: "#c1c1c1",
          500: "#a9a9a9",
          600: "#909090",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
