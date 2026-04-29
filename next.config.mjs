/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Static export for GitHub Pages with custom domain
  output: 'export',
  
  // Trailing slash for better compatibility
  trailingSlash: true,

  // Image optimization - unoptimized for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
