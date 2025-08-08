import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Remove static export for server-side rendering
  // output: 'export',
  // trailingSlash: true,
  // images: {
  //   unoptimized: true,
  // },
  // assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
};

export default nextConfig;
