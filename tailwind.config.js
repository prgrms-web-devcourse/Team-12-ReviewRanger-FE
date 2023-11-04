/** @type {import('tailwindcss').Config} */
import rippleui from 'rippleui'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          red: {
            100: '#2C1D1D',
            200: '#1F0909',
            300: '#220000',
          },
          ivory: '#FFFAEA',
          yellow: '#FFF4D1',
          gray: '#1F1F1F',
        },
        gray: {
          100: '#BABABA',
          200: '#636363',
          300: '#454545',
        },
        active: {
          orange: '#FF9900',
        },
        sub: {
          red: {
            100: '#E8BBBB',
            200: '#FF0000',
          },
          orange: '#C34711',
          yellow: '#FFE146',
          green: '#519C17',
          brown: '#A16B19',
          wine: '#C31166',
          pink: '#FF42B3',
          blue: '#1138C3',
          skyblue: '#48F4FF',
        },
      },
      fontSize: {
        xs: '0.625rem',
        sm: '0.75rem',
        base: '0.8125rem',
        lg: '0.875rem',
        xl: '1rem',
        '2xl': '1.125rem',
      },
      boxShadow: {
        md: '0px 2px 0px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [rippleui],
}
