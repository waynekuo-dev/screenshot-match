/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserve M0's "build doesn't gate on types/lint" behavior. Errors still
  // surface in the editor; they just don't block the deploy.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
