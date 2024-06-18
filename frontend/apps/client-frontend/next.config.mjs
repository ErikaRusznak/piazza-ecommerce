/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
