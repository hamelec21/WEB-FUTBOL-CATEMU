import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "127.0.0.1",
      "localhost",
      "futbol.jrdeveloper.cl",
      "https://api-futbol-catemu.jrdeveloper.cl/api",
    ],
  },
};

export default nextConfig;
