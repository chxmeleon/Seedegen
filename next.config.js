/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      'static.nftgo.io',
      'lh3.googleusercontent.com',
      'openseauserdata.com',
      'img-ae.seadn.io',
      'img.seadn.io',
      'storage.opensea.io',
      'i.seadn.io',
      'storage.googleapis.com',
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

module.exports = nextConfig
