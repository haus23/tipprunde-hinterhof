const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '380px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('@headlessui/tailwindcss'), require('flowbite/plugin')],
};
