const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,tsx,ejs,html}',
    './src/**/**/*.{js,jsx,tsx,ejs,html}',
  ],
  theme: {},
  plugins: [require('@tailwindcss/forms')],
};
