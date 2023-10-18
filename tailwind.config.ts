import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        signUp: '0px 5px 10px rgba(4, 10, 34, 0.2)',
        one: '0px 2px 3px rgba(7, 7, 77, 0.05)',
        sticky: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)'
      }
    },
    container: {
      center: true,
      padding: '1rem'
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#ffffff',
      black: '#030712',
      dark: '#1d2144',
      primary: '#334bac',
      red: '#c53030',
      'body-color': '#959cb1'
    },
    screens: {
      xs: '450px',
      sm: '575px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    }
  },
  plugins: [],
}
export default config
