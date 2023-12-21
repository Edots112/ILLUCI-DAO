/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      pixel: ['DotGothic16'],
      bolda: ['Modak'],
      roboto: ['Roboto'],
    },
    extend: {
      backgroundImage: {
        'hero-page': "url('/src/assets/image/hero-page.jpg')",
        'hero-pages': "url('/src/assets/image/hero-page.jpg')",
      },
    },
  },
  plugins: [],
};
