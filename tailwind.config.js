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
      gridTemplateColumns: {
        // Take care of NftsGrid
        14: 'repeat(14, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
});
