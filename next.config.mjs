/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "***" }],
    qualities: [75, 90, 95, 100],
  },
};

export default nextConfig;
