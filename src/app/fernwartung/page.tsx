import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fernwartung',
  description: 'VCDS Fernwartung: AnyDesk-Tool herunterladen, ID mitteilen, Support-Mitarbeiter hilft direkt auf Ihrem Bildschirm.',
}

const steps = [
  { title: 'Fernwartungstool herunterladen', desc: 'Laden Sie das AnyDesk-Tool von unserer Download-Seite herunter und entpacken Sie das Archiv.' },
  { title: 'Anwendung ausfuehren', desc: 'Fuehren Sie die Anwendung aus. Eine Installation ist nicht notwendig \u2013 das Programm startet direkt.' },
  { title: 'Adresse mitteilen', desc: 'Teilen Sie dem Support-Mitarbeiter die Nummer aus "Ihre Adresse" mit. Diese finden Sie im AnyDesk-Fenster.' },
  { title: 'Verbindung annehmen', desc: 'Nehmen Sie die Remote-Support-Anfrage an. Wichtig: Nur wenn eindeutig ein VCDS.de Mitarbeiter anfragt!' },
]

export default function Fernwartung() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-5 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs text-slate-400 mb-3">Start / Fernwartung</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Fernwartung</h1>
            <p className="text-slate-300 max-w-xl">Remote Support via AnyDesk. Unser Techniker hilft Ihnen direkt auf Ihrem Bildschirm.</p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 py-12 space-y-10">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-3">
            <Icon name="warning" size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 text-sm mb-1">Wichtiger Hinweis</p>
              <p className="text-sm text-amber-800 leading-relaxed">Akzeptieren Sie die Verbindung ausschliesslich, wenn Sie zuvor mit einem Mitarbeiter der Auto-Intern GmbH telefoniert haben und dieser die Fernwartung angekuendigt hat.</p>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map(function(s, i) {
              return (
                <div key={i} className="flex gap-4 items-start bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center pt-6">
            <a href="https://www.vcds.de/wp-content/uploads/2024/08/AnyDesk_VCDSde_Client.zip"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors text-lg">
              <Icon name="download" size={20} className="text-white" />
              AnyDesk herunterladen
            </a>
            <p className="text-sm text-slate-500 mt-4">
              Support-Telefon: <a href="tel:+4923458545800" className="text-blue-600 font-semibold hover:underline">+49 (0) 234 58 545 800</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
