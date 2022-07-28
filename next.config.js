// next.config.js
module.exports = {
  images: {
    domains: ['rxbadlmhqshszwaxifut.supabase.co'],
  },
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
