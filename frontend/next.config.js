/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/octocat",
        statusCode: 301,
      },
    ];
  },
}

module.exports = nextConfig
