// next.config.ts
const nextConfig = {
  images: {
    // remotePatterns: [],
    remotePatterns: [
      new URL("https://assets.example.com/account123/**"),
      new URL("https://assets.example.com/account123/**?v=1234"),
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
