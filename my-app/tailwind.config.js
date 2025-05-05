/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          dark: '#142645',
          darker: '#02122E',
        },
        accent: {
          blue: '#146BFF',
          orange: '#EF8B00',
        }
      },
    },
  },
  plugins: [],
}