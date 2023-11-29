/** @type {import('tailwindcss').Config} */
import rippleui from 'rippleui'

export default {
  rippleui: {
    themes: [
      {
        themeName: 'dark',
        colorScheme: 'dark',
        colors: {
          content1: '#000000',
        },
      },
    ],
  },
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
          hover: {
            yellow: '#FFE8A3',
          },
          gray: '#1F1F1F',
        },
        gray: {
          100: '#BABABA',
          200: '#636363',
          300: '#454545',
          400: '#DBDBDB',
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
        error: {
          lighten: '#FFE5E5',
          darken: '#481A1D',
        },
        success: {
          lighten: '#DDF3E4',
          darken: '#113123',
        },
        info: {
          lighten: '#F8DEC7',
          darken: '#3F2C26',
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
      spacing: {
        2.5: '0.625rem',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        'progress-animation': 'progress 3s linear forwards',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [rippleui],
}
