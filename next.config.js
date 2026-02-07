/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'api.dairydelightcheese.com'],
  },
  // Suppress Next.js dev overlay stack frame errors
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.dairydelightcheese.com/api/:path*',
      },
    ];
  },
  // Handle Next.js dev overlay requests
  async headers() {
    return [
      {
        source: '/__nextjs_original-stack-frame',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

