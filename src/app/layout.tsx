import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'VCDS.de', template: '%s | VCDS.de' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
