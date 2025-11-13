/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,

  images: {
    domains: ['images.unsplash.com', 'cdn.pixabay.com', 'ai-business-autopilot.vercel.app'],
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.business-autopilot.co.uk/:path*'
      }
    ];
  },

  env: {
    NEXT_PUBLIC_APP_NAME: 'AI Business Autopilot',
    NEXT_PUBLIC_VERSION: 'v1.0',
  }
};

module.exports = nextConfig;
