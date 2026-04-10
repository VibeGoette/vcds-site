import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import Script from 'next/script'
import { getGlobalSeo } from '@/lib/seo'
import { SITE_URL } from '@/lib/site-url'
import { ThemeProvider } from '@/components/ThemeProvider'
import { StyleProvider } from '@/components/StyleProvider'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import { CookieBanner } from '@/components/CookieBanner'
import { LiveChatLoader } from '@/components/LiveChatLoader'
import '../globals.css'

// Quicksand is the VCDS corporate font — self-hosted via next/font (DSGVO-compliant, no Google CDN requests)
const quicksand = Quicksand({ subsets: ['latin'], weight: ['300','400','500','600','700'], display: 'swap', variable: '--font-quicksand' })

export const metadata: Metadata = {
  title: { default: 'VCDS – Diagnosegerät für VW, Audi, Skoda & Seat', template: '%s | VCDS.de' },
  description: 'VCDS Diagnoseadapter von Ross-Tech, vertrieben durch Auto-Intern GmbH. HEX-V2 ab 294€, HEX-NET ab 514€. Support aus Bochum.',
  keywords: ['VCDS', 'Ross-Tech', 'HEX-V2', 'HEX-NET', 'VAG-COM', 'Diagnose', 'VW', 'Audi', 'Skoda', 'Seat', 'Fehlercode', 'Auto-Intern'],
  authors: [{ name: 'Auto-Intern GmbH', url: 'https://auto-intern.de' }],
  creator: 'Auto-Intern GmbH',
  publisher: 'Auto-Intern GmbH',
  formatDetection: { telephone: true, email: true },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: { 'de-DE': '/', 'de-AT': '/', 'de-CH': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'VCDS.de',
    title: 'VCDS – Diagnosegerät für VW, Audi, Skoda & Seat',
    description: 'VCDS Diagnoseadapter von Ross-Tech. HEX-V2 ab 294€, HEX-NET ab 514€. Kostenloser Telefon-Support aus Bochum.',
    url: SITE_URL,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'VCDS.de – Fahrzeugdiagnose von Ross-Tech' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VCDS.de – Fahrzeugdiagnose von Ross-Tech',
    description: 'VCDS Diagnoseadapter: HEX-V2 ab 294€, HEX-NET ab 514€. Support aus Bochum.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' as const },
  },
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Fetch CMS global settings for analytics & SEO verification
  const globalSeo = await getGlobalSeo()

  return (
    <div className={`${quicksand.variable} font-sans antialiased min-h-screen flex flex-col`}>
      <ThemeProvider>
        <StyleProvider>
        <AnimateOnScroll />
        {/* Google / Bing Site Verification (from Admin Panel) */}
        {globalSeo.googleSiteVerification && (
          <meta name="google-site-verification" content={globalSeo.googleSiteVerification} />
        )}
        {globalSeo.bingSiteVerification && (
          <meta name="msvalidate.01" content={globalSeo.bingSiteVerification} />
        )}

        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md">
          Zum Hauptinhalt springen
        </a>
        {children}

        {/* Umami Analytics (DSGVO-konform, cookieless — from Admin Panel) */}
        {globalSeo.umamiSiteId && globalSeo.umamiUrl && (
          <Script
            id="umami-analytics"
            strategy="lazyOnload"
            src={globalSeo.umamiUrl}
            data-website-id={globalSeo.umamiSiteId}
          />
        )}

        {/* LiveChat — only loaded after cookie consent (DSGVO) */}
        <LiveChatLoader />
        {/* Cookie Banner (DSGVO) */}
        <CookieBanner />
        </StyleProvider>
      </ThemeProvider>
    </div>
  )
}
