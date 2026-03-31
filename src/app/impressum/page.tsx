import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impressum' }

export default function Impressum() {
  return (
    <>
      <Header />
      <main id="main" className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Impressum</h1>
        <div className="text-slate-600 space-y-6 text-sm leading-relaxed">
          <div>
            <p className="font-bold text-slate-900">Auto-Intern GmbH</p>
            <p>Herner Straße 299, Gebäude 29B<br />44809 Bochum<br />Deutschland</p>
          </div>
          <div>
            <p>Telefon: +49 (0) 234 58 545 800<br />E-Mail: info@vcds.de</p>
          </div>
          <div>
            <p>Handelsregister: Amtsgericht Bochum<br />Geschäftsführer: [Name eintragen]</p>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-1">Haftungshinweis</p>
            <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
