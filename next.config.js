/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export hanya untuk self-host di VPS; di Vercel pakai build standar.
  output: process.env.VERCEL ? undefined : "export",
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
};

// Keep previously shared media links alive after the API moved to its own
// hostname. Only Vercel can proxy these; the static VPS export has no server.
if (process.env.VERCEL) {
  nextConfig.rewrites = async () => [
    {
      source: "/files/:path*",
      destination: "https://kabox-api.akaa.dev/files/:path*",
    },
  ];
}

module.exports = nextConfig;
