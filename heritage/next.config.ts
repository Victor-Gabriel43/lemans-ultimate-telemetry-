import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photographs are referenced by URL from the database; allow any HTTPS host
    // so archivists can attach licensed images from agencies and newsrooms.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
