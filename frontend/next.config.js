/** @type {import('next').NextConfig} */
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: true,
  openAnalyzer: true,
});
const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ["localhost"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")], // 2. sassOptions 옵션 추가
  },
};

module.exports = withBundleAnalyzer(removeImports(nextConfig));
