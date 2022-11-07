/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
}

module.exports = nextConfig
