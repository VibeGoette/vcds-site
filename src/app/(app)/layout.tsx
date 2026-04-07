import type { Metadata } from 'next'
import { Inter, DM_Sans, Source_Sans_3, Quicksand } from 'next/font/google'
import Script from 'next/script'
import { getGlobalSeo } from '@/lib/seo'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap', variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap', variable: '--font-dm-sans' })
const sourceSans3 = Source_Sans_3({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap', variable: '--font-source-sans-3' })
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400','500','600','700'], display: 'swap', variable: '--font-quicksand' })

export const metadata: Metadata = {
  title: { default: 'VCDS – Diagnosegerät für VW, Audi, Skoda & Seat', template: '%s | VCDS.de' },
  description: 'VCDS Diagnoseadapter von Ross-Tech, vertrieben durch Auto-Intern GmbH. HEX-V2 ab 294€, HEX-NET ab 514€. Support aus Bochum.',
  keywords: ['VCDS', 'Ross-Tech', 'HEX-V2', 'HEX-NET', 'VAG-COM', 'Diagnose', 'VW', 'Audi', 'Skoda', 'Seat', 'Fehlercode', 'Auto-Intern'],
  authors: [{ name: 'Auto-Intern GmbH', url: 'https://auto-intern.de' }],
  creator: 'Auto-Intern GmbH',
  publisher: 'Auto-Intern GmbH',
  formatDetection: { telephone: true, email: true },
  metadataBase: new URL('https://vcds-site.vercel.app'),
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
    url: 'https://vcds-site.vercel.app',
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
    <div className={`${inter.variable} ${dmSans.variable} ${sourceSans3.variable} ${quicksand.variable} font-sans antialiased min-h-screen flex flex-col`}>
      <ThemeProvider>
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

        {/* LiveChat.com Widget */}
        <Script id="livechat-widget" strategy="lazyOnload">{`
          window.__lc = window.__lc || {};
          window.__lc.license = 17285498;
          ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])}};window.LiveChatWidget=window.LiveChatWidget||e;var s=t.createElement("script");s.async=!0;s.type="text/javascript";s.src="https://cdn.livechatinc.com/tracking.js";t.head.appendChild(s)})(window,document,[].slice)
        `}</Script>
      </ThemeProvider>
    </div>
  )
}
