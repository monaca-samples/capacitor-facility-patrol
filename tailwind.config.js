/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{js,jsx,jsx,ts,tsx,css}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        greenLight: '#88F26B',
        greenMedium: '#7AD95F',
        greenDarkest: '#7AD95F',
        greenDefault: '#66A649',
        black: '#0D0D0D',
        blackLight: '#1F1F1F',
        white: '#FFFFFF'
      },
      fontFamily: {
        poppins: ['Poppins'],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
