import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'dummyimage.com',
      },
    ],
  },
};

export default nextConfig;
