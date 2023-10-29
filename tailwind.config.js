/** @type {import('tailwindcss').Config} */
import rippleui from 'rippleui'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  rippleui: {
    themes: [
      {
        themeName: 'dark',
        colors: {
          backgroundPrimary: '#ffffff',
        },
      },
    ],
  },
  plugins: [rippleui],
}
