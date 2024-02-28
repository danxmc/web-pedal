import type { Config } from 'tailwindcss';
import { colors, fontFamily } from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1360px',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        ...colors,
        'light-gold': '#f5bc51',
        'dark-gold': '#533519',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {},
} satisfies Config;
