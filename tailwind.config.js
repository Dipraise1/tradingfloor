/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Ultra Dark (OLED friendly)
        surface: "#101012", // Slightly lighter for cards
        surfaceHighlight: "#18181b", // Interactive elements
        primary: "#2563EB", // Electric Blue
        accent: "#00D26A", // Crisp Graph Green
        danger: "#F92F60", // Modern Vibrant Red
        text: "#FFFFFF", // Pure White
        textMuted: "#71717A", // Zinc 500
      }
    },
  },
  plugins: [],
}
