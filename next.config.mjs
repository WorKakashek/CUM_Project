/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "preview.free3d.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLICK_STRIPE_PUBLIC_KEY,
  },
};

export default nextConfig;
