/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        consolas :['Consolas'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(183,0,255,0.364670868347339) 100%)',
      },
    },
  },
  plugins: [],
}

