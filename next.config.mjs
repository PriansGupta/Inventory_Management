/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com",
      "images.unsplash.com",
      "unsplash.com",
      "*",
      "rukminim2.flixcart.com",
      "cdn.pixabay.com",
      "www.jedrasiak.eu",
    ], // Add your external domains here
  },
};

export default nextConfig;
