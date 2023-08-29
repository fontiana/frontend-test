import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray: {
        200: '#eeeeee',
        400: '#9a9a9a',
      },
      teal: {
        500: '#2597a7',
        600: '#1d818f',
      },
      green: {
        100: '#e6f9ee',
        200: '#c4f3d7',
        600: '#6bb68d',
      },
      red: {
        100: '#f9e6e6',
        200: '#f3c4c4',
        600: '#b66b6b',
      },
      white: '#fff',
      black: '#000',
    },
  },
  plugins: [],
};
export default config;
