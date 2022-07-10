const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1700px',
        '4xl': '2100px',
        '5xl': '2500px',
        '6xl': '2900px',
        '7xl': '3300px',
        '8xl': '3700px',
        '9xl': '4100px',
        '10xl': '4500px',
      },
    },
  },
  plugins: [],
});
