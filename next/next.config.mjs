/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://cdn.dummyjson.com/products/**"),
      new URL("https://cdn.dummyjson.com/product-images/**"),
    ],
  },
};

export default nextConfig;