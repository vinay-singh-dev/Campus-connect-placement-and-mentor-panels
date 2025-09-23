/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        card: "#FFFFFF",
        primary: "#164e63",
        secondary: "#475569",
        accent: "#facc15",
        success: "#4ADE80",
        danger: "#F87171",
        info: "#60A5FA",
        purple: "#A78BFA",
        muted: "#94A3B8",

        // Dark theme colors
        darkBackground: "#0f172a",
        darkCard: "#1e293b",
        darkPrimary: "#0ea5e9",
        darkSecondary: "#f1f5f9",
        darkMuted: "#334155",
        darkAccent: "#f59e0b",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
        soft: "0 2px 6px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
