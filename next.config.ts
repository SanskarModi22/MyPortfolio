import type { NextConfig } from "next";

// Static export: every route becomes plain HTML/JS, deployable on Vercel or any
// static host. The phase-2 "ask my portfolio" agent will need a server — flip
// this off (and add an API route) when that lands.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
