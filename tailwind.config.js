const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,tsx,ejs,html}',
    './src/**/**/*.{js,jsx,tsx,ejs,html}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          750: '#283548',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
