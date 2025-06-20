/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firms.modaps.eosdis.nasa.gov'],
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

module.exports = nextConfig