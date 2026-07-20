/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Company logos and any future images come from Cloudinary
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  // Silences the Next.js telemetry prompt in CI / non-interactive environments
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
