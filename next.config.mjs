/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com",
      "images.unsplash.com",
      "unsplash.com",
      "*",
      "rukminim2.flixcart.com",
    ], // Add your external domains here
  },
};

export default nextConfig;
