/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      container: {
        center: true
      },
      colors: {
        "app-bg": "#f8f8f8",
        "app-header": "#2f4a52",
        "app-primary": "#648e94",
        "app-secondary": "#dbe2e4",
        "app-warn": "#d76569"
      }
    },
  },
  plugins: [],
}