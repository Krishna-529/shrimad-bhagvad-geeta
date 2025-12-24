/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFA738',
        'light-bg': '#FFF0DC',
        'dark-bg': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
