/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "*.devtunnels.ms",
        "*.app.github.dev",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
