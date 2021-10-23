module.exports = {
  purge: [
    './alpha/**/*.{js,ts,jsx,tsx}',
    './anchor/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './mint/**/*.{js,ts,jsx,tsx}',
    './notifications/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black: '#181818',
      white: '#FFFFFF',
      'white-100': '#777777',
      gray: '#303030',
      green: '#143E46',
      'green-100': '#00C17C',
      blue: '#00c7e2',
      red: '#461D14',
      orange: '#E2841D',
      purple: '#9100AC',
    },
    fontFamily: {
      sans: ['Open Sauce Sans', 'sans-serif'],
      mono: ['Monaco', 'Courier', 'monospace'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
