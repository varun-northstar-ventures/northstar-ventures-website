import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.trycloudflare.com'],
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
