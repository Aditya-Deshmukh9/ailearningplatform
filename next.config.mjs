/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/dz8p6pcha/image/upload/**"),
    ],
  },
};

export default nextConfig;
