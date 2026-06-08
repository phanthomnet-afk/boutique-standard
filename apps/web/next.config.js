/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: false,
  },

  // Transpile local packages
  transpilePackages: ["@tbs/schema", "@tbs/web-engine"],

  // Expose public env vars to the browser bundle.
  // Server-only vars (SANITY_API_TOKEN, RESEND_API_KEY, CLIENT_TOKEN_SECRET,
  // SANITY_WEBHOOK_SECRET) must NOT be listed here.
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },

  // Strict image domain allowlist (extend when adding Sanity CDN).
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Sanity CDN — uncomment when Sanity is wired up:
      // { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

module.exports = nextConfig;
