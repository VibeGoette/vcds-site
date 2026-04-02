import { withPayload } from '@payloadcms/next/withPayload'

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
}

export default withPayload(nextConfig)
