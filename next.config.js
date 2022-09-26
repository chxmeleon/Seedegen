/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
}

module.exports = nextConfig
