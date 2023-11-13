/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 86400 * 2, // 1 day
  },
};

module.exports = nextConfig;
