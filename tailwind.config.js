/** @type {import('tailwindcss').Config} */
import rippleui from 'rippleui'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  rippleui: {
    removeThemes: ['dark'],
  },
  plugins: [rippleui],
}
