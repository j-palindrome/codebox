/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/client/**/*.{tsx,css}', 'index.html'],
  theme: {
    extend: {
      fontFamily: {
        serif: 'Monaco'
      }
    }
  },
  plugins: []
}
