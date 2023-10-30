/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-50": "#e0fcff",
        "primary-100": "#bef8fd",
        "primary-200": "#87eaf2",
        "primary-300": "#54d1db",
        "primary-400": "#38bec9",
        "primary-500": "#2cb1bc",
        "primary-600": "#14919b",
        "primary-700": "#0e7c86",
        "primary-800": "#0a6c74",
        "primary-900": "#044e54",

        "grey-50": "#f8fafc",
        "grey-100": "#f1f5f9",
        "grey-200": "#e2e8f0",
        "grey-300": "#cbd5e1",
        "grey-400": "#94a3b8",
        "grey-500": "#64748b",
        "grey-600": "#475569",
        "grey-700": "#334155",
        "grey-800": "#1e293b",
        "grey-900": "#0f172a",

        black: "#222",
        white: "#fff",
        "red-light": "#f8d7da",
        "red-dark": "#842029",
        "green-light": "#d1e7dd",
        "green-dark": "#0f5132",
      },
    },
  },
  plugins: [],
};
