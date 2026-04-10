import { withPayload } from '@payloadcms/next/withPayload'
import { buildHeaders } from './src/lib/security-headers.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/die-vcds-de-user-map',
        destination: '/usermap',
        permanent: true,
      },
    ]
  },
  async headers() {
    return buildHeaders()
  },
}

export default withPayload(nextConfig)
