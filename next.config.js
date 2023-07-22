/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  jsx: {
    // Set throwIfNamespace to false to bypass the namespace tag warning
    throwIfNamespace: false,
  },
  devIndicators: {
    autoPrerender: false,
  },
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: `http://xantener-pizza-kebap.local:3000/$1`,
      },
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
