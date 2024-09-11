import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },

      colors: {
        green: {
          600: '#316962',
          700: '#254f4A',
        },
        orange: {
          600: '#DD720F',
          700: '#C76102',
        },
      },

      gridTemplateColumns: {
        cards: 'repeat(auto-fit, minmax(16rem, 1fr))',
        hero: 'repeat(4, 16rem)',
      },
    },
  },
  plugins: [],
}
export default config
