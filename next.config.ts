import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Keep your existing Unsplash config if you have it
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // This allows YouTube Video Thumbnails
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com", // This allows YouTube Channel Avatars
      },
      {
        protocol: "https",
        hostname: "placehold.co", // This allows your fallback images
      },
    ],
  },
};

export default nextConfig;
