import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jaagrblogs.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
