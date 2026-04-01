import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Optional: allow direct LAN access to dev server origin in Next.js dev mode
  allowedDevOrigins: ["192.168.0.103"],
};

export default nextConfig;
