import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: { default: 'VCDS.de', template: '%s | VCDS.de' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
