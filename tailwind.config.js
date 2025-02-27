/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9d63df",
        "light-primary": "#9C59DF9E",
        "fade-purple": "#f4eff6",
        "dark-purple": "#3F3D56",
        "dark-blue": "#172B4D",
        midnight: "#121721",
        "light-gray": "#C1C7D0",
        "dark-gray": "#434859",
        gray: "#8B9199",
        white: "#ffffff",
        "fade-white": "#E5E5E5",
        success: "#4DDA63",
        warning: "#F4DE19",
        danger: "#E2445C",
      },
    },
  },
  plugins: [],
};
