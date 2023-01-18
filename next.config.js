/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/ipfs':{page:'/ipfs'},
      '/dashboard':{page:'/dashboard'},
      '/settings':{page:'/settings'},
      '/signup':{page:'/signup'},
      '/login':{page:'/login'},
      '/premium':{page:'/premium'},
      '/test':{page:'/test'},
      '/onboard':{page:'/onboard'},
    }
  }
}

module.exports = nextConfig
