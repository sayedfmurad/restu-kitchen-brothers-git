/** @type {import('next').NextConfig} */
const nextConfig = {
  
  devIndicators: {
    autoPrerender: false,
  },
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: `http://kitchen-brothers.local:3000/$1`,
      },
      {
        source: '/(.*)',
        destination: `http://pizzeria-dino.foodieway.local:3000/$1`,
      },
      {
        source: '/(.*)',
        destination: `http://foodieway.local:3000/$1`,
      },
    ];
  }
}

module.exports = nextConfig
