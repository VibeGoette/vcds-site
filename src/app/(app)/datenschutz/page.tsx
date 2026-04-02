import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getPageSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('datenschutz', { title: 'Datenschutzerklärung' })
}

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 max-w-3xl mx-auto px-5 py-16 w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Datenschutzerklärung</h1>
        <div className="text-slate-600 space-y-6 text-sm leading-relaxed">
          <p>Die Auto-Intern GmbH nimmt den Schutz Ihrer persönlichen Daten ernst. Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten auf dieser Website.</p>
          <div>
            <h2 className="font-bold text-slate-900 mb-2">Verantwortliche Stelle</h2>
            <p>Auto-Intern GmbH, Herner Str. 299, Geb. 29B, 44809 Bochum. E-Mail: info@vcds.de</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 mb-2">Hosting</h2>
            <p>Diese Website wird bei Vercel Inc. gehostet. Beim Besuch werden technisch notwendige Daten (IP-Adresse, Zeitstempel, aufgerufene Seite) verarbeitet.</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 mb-2">Cookies</h2>
            <p>Diese Website verwendet keine Tracking-Cookies. Die Analyse erfolgt über Umami Analytics (cookieless, DSGVO-konform).</p>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 mb-2">Ihre Rechte</h2>
            <p>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Beschwerde bei der zuständigen Aufsichtsbehörde.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
