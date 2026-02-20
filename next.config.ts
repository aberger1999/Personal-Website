import type { NextConfig } from 'next'

const config: NextConfig = {
  experimental: {
    serverMinification: false,
  },
  output: 'standalone',
}

export default config
