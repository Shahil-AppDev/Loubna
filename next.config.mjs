/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Trailing slash for better compatibility
  trailingSlash: true,

  // Image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
