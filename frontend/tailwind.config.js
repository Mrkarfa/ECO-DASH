/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#0A0A0A",
          "dark-secondary": "#1A1A1A",
          light: "#E8E5D9",
          "light-secondary": "#F5F3ED",
        },
        green: {
          primary: "#2D4A3E",
          secondary: "#3D5F4E",
          accent: "#4A6F5F",
          glow: "#5A8A70",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          tertiary: "#808080",
          dark: "#1A1A1A",
          "dark-secondary": "#4A4A4A",
        },
        accent: {
          white: "#FFFFFF",
          gray: "#CCCCCC",
        },
        chart: {
          "bar-light": "#E8E5D9",
          "bar-white": "#FFFFFF",
          "bar-dark": "#2A2A2A",
        },
        status: {
          success: "#4CAF50",
          warning: "#FFC107",
          error: "#F44336",
          info: "#2196F3",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        hero: "72px",
        xxlarge: "48px",
        xlarge: "32px",
        large: "24px",
        medium: "16px",
        small: "14px",
        xsmall: "12px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        xxxl: "64px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};
