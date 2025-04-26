/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify is now enabled by default in Next.js 13+
    experimental: {
        // Enable App Router features
        appDir: true
    }
};

module.exports = nextConfig;
