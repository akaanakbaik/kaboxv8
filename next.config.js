/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export hanya untuk self-host di VPS; di Vercel pakai build standar.
  output: process.env.VERCEL ? undefined : "export",
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
