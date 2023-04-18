/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_SERVER: process.env.NEXT_PUBLIC_APP_SERVER,
    CLOUDINARY_LINK: process.env.CLOUDINARY_LINK,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
