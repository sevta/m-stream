const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1.2rem'
    },
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      colors: {
        warmGray: colors.warmGray,
        blueGray: colors.blueGray
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
