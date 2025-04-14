import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverMinification: false,
  },
  output: 'standalone',
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
  },
}

export default config
