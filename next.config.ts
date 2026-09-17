import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // three.js ships untranspiled ESM addons; Next handles this natively in 15.x
  transpilePackages: ["three"],
};

export default nextConfig;
