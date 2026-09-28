/** Empty webpack override removed — Phaser is client-only via dynamic import. */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
