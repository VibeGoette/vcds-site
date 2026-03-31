import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300','400','500','600','700'], display: 'swap', variable: '--font-quicksand' })

export const metadata: Metadata = {
  title: { default: 'VCDS – Diagnosegerät für VW, Audi, Skoda & Seat', template: '%s | VCDS.de' },
  description: 'VCDS Diagnoseadapter von Ross-Tech, vertrieben durch Auto-Intern GmbH. HEX-V2 ab 294€, HEX-NET ab 514€. Support aus Bochum.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={quicksand.variable}>
      <body className="font-sans antialiased text-slate-900 bg-white">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">Zum Hauptinhalt springen</a>
        {children}
      </body>
    </html>
  )
}
