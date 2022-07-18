module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
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
        // Take care of Grid component
        14: 'repeat(14, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
      },
      keyframes: {
        abracadabra: {
          '0%,100%': { opacity: 0, transform: 'translateY(30px)' },
          '10%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-30px)' },
        },
        pulse: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
      animation: {
        abracadabra: 'abracadabra 3.35s linear',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
