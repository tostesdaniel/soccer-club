/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/leaderboard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
