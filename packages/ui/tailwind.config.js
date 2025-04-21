/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slack-purple': '#4A154B',
        'slack-green': '#007a5a',
        'slack-blue': '#1264A3',
        'slack-red': '#E01E5A'
      }
    },
  },
  plugins: [],
}
