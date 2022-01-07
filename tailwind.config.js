const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,tsx}', './src/**/**/*.{js,jsx,tsx}'],
  theme: {},
  plugins: [require('@tailwindcss/forms')],
};
