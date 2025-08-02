// tailwind.config.js
import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: {
          DEFAULT: '#00C0C7',
          50: '#e0fafa',
          100: '#a8f2f2',
          300: '#4de0e5',
          800: '#047a80',
          900: '#045b5e',
        },
      },
      fontSize: {
        'xs-plus': '13px',
        '3xl-plus': '3.2em',
      },
      spacing: {
        350: '350px',
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
});
