/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Blog card cover photos (lib/blog-posts.ts, imageUrlFor) come from loremflickr.com — a
    // keyword-based stock-photo service backed by real Flickr photos, pinned per post via
    // `?lock=`. Required for next/image to load them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
