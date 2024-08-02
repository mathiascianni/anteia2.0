/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0066FF",
        "medium": "#A49E9E",
        "primary-light": "#BBDEF0",
        "primary-dark": "#1258C0",
        "primary-disabled": "#537EBF",
        "secondary": "#FFBD15",
        "success": "#5FC52F",
        "error": "#F24848",
        "light": "#F5F5F5",
        "dark": "#2B2A2F",
      },
      fontFamily: {
        "body": ["Poppins", "sans-serif"],
        "titles": ["Roboto", "sans-serif"],
        "extra": ["Raleway", "sans-serif"],
      },
      boxShadow: {
        "sm": "0 0 8px 4px rgba(0, 0, 0, 0.25)",
      }
    },
    plugins: [],
  }
}