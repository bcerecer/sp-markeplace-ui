// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://fullnode.devnet.aptoslabs.com' },
        ],
      },
    ];
  },
};
