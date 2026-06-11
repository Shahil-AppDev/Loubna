/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  experimental: {
    serverActions: {
      bodySizeLimit: "32mb",
    },
  },

  // Trailing slash for better compatibility
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: "/partenaire",
        destination: "/partenaires",
        permanent: true,
      },
    ];
  },

  // Image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
