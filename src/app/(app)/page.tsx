import { Header } from '@/components/Header'
import { OrganizationSchema, ProductSchema } from '@/components/StructuredData'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      <OrganizationSchema />
      <ProductSchema name="Ross-Tech HEX-V2" description="USB Diagnoseadapter fuer VW, Audi, Skoda, Seat. 3/10/Unlimited VIN." price="294" sku="HEX-V2" url="https://www.auto-intern.de/shop/diagnose-adapter/198/hex-v2-inkl.-vcds-lizenz" />
      <ProductSchema name="Ross-Tech HEX-NET" description="WLAN Diagnoseadapter fuer VW, Audi, Skoda, Seat. Kabellose Diagnose." price="514" sku="HEX-NET" url="https://www.auto-intern.de/shop/diagnose-adapter/199/hex-net-wifi-inkl.-vcds-lizenz" />
      <main id="main">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white px-5 py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_60%)]" />
          <div className="relative max-w-6xl mx-auto">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs text-blue-400 font-semibold tracking-[0.12em] uppercase">Ross-Tech VCDS</span>
                <span className="w-px h-3 bg-slate-600" />
                <span className="text-xs text-slate-400">Vertrieb: Auto-Intern GmbH, Bochum</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Ihr Partner für schnelle{' '}
                <span className="text-blue-400">Fahrzeugdiagnose</span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-xl">
                Bestellen Sie Ihren passenden Diagnoseadapter oder informieren Sie sich
                über HEX-V2, HEX-NET und die verschiedenen Lizenzmodelle. Erstklassiger
                Support per Telefon, E-Mail und Chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto">
                <a href="https://auto-intern.de/shop/" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors text-center">
                  Im Shop bestellen
                </a>
                <Link href="/kaufberatung"
                  className="px-6 py-3 border border-white/20 text-white font-semibold rounded-md hover:bg-white/5 transition-colors text-center">
                  Kaufberatung lesen
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2"><Icon name="phone" size={14} className="text-slate-500" />+49 (0) 234 58 545 800</span>
                <span className="flex items-center gap-2"><Icon name="mail" size={14} className="text-slate-500" />support@vcds.de</span>
                <span className="flex items-center gap-2"><Icon name="map" size={14} className="text-slate-500" />Bochum</span>
              </div>
            </div>
          </div>
        </section>

        {/* Was ist VCDS */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Was ist VCDS?</h2>
            <p className="text-slate-500 mb-8 max-w-2xl">
              Das VCDS Diagnosegerät von Ross-Tech ist das Tool für professionelle
              Steuergerätediagnosen und Codierungen an VW, Audi, Skoda, Seat und
              weiteren VW-Nutzfahrzeugen.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {['Fehlercodes auslesen und löschen','Messwerte aufzeichnen und grafisch darstellen','Codierungen und Grundeinstellungen','Auto-Scan aller Steuergeräte','Kostenloser Telefon-Support','Made in Germany (Bochum)'].map(f => (
                <div key={f} className="flex gap-2 text-sm text-slate-600">
                  <Icon name="check" size={16} className="text-blue-500 shrink-0 mt-0.5" />{f}
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-3">
              <Icon name="warning" size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900 text-sm mb-1">Warum VCDS aus Bochum?</p>
                <p className="text-sm text-amber-800">
                  Das Original-Produkt wird hier zusammengebaut und trägt das Qualitätssiegel
                  &quot;Made in Germany&quot;. Die Auto-Intern GmbH bietet als autorisierter
                  Vertriebspartner von Ross-Tech erstklassigen Support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Produkt-Cards */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Zwei Produkte, ein Unterschied</h2>
            <p className="text-slate-500 mb-10 max-w-2xl">
              Egal ob erfahrener Mechaniker oder begeisterter Autoliebhaber &ndash;
              unser umfangreiches Angebot und der Support von Auto-Intern bringen Sie weiter.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name:'HEX-V2', sub:'Der Allrounder', price:'ab 294 €', icon:'usb', badge:'USB', feats:['Voller Funktionsumfang','3 / 10 / Unlimited VIN','Kabelgebunden (USB)','Kostenloser Support und Forum'], url:'https://www.auto-intern.de/shop/diagnose-adapter/198/hex-v2-inkl.-vcds-lizenz' },
                { name:'HEX-NET', sub:'Für Profis und Werkstätten', price:'ab 514 €', icon:'wifi', badge:'WLAN', feats:['Alles was der HEX-V2 kann, plus:','Kabellos über WLAN','Messwerte während der Fahrt','10 / Unlimited VIN'], url:'https://www.auto-intern.de/shop/diagnose-adapter/199/hex-net-wifi-inkl.-vcds-lizenz' },
              ].map(p => (
                <div key={p.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Icon name={p.icon} size={20} className="text-blue-600" />
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">{p.badge}</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{p.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">{p.sub}</p>
                  <div className="space-y-2 mb-6">
                    {p.feats.map(f => (
                      <div key={f} className="flex gap-2 text-sm text-slate-600">
                        <Icon name="check" size={14} className="text-blue-500 shrink-0 mt-0.5" />{f}
                      </div>
                    ))}
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="block w-full py-3 bg-red-600 text-white text-center font-semibold rounded-md hover:bg-red-500 transition-colors">
                    Im Auto-Intern Shop bestellen
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-center text-xl font-bold mb-10">Vorteile von VCDS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
              {[{v:'1000+',l:'Zufriedene Kunden'},{v:'15+',l:'Jahre Erfahrung'},{v:'32.445',l:'Fehlercodes im Klartext'}].map(s => (
                <div key={s.l}><p className="text-3xl md:text-4xl font-bold text-blue-400">{s.v}</p><p className="text-xs text-slate-400 mt-2">{s.l}</p></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[{n:'HEX-NET',ic:'wifi'},{n:'HEX-V2',ic:'usb'},{n:'Diagnose-Adapter',ic:'plug'},{n:'Komplettsysteme',ic:'shield'},{n:'Upgrades',ic:'bolt'},{n:'Zubehör',ic:'cog'}].map(c => (
                <div key={c.n} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <Icon name={c.ic} size={16} className="text-blue-400" />
                  <span className="text-sm font-medium">{c.n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Support von Auto-Intern</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {t:'Telefon-Support',d:'+49 (0) 234 58 545 800',s:'Mo–Fr 09:00–16:00 Uhr',ic:'phone'},
                {t:'Community',d:'forum.vcds.de · wiki.vcds.de',s:'Kostenlos für alle VCDS-Nutzer',ic:'chat'},
                {t:'E-Mail',d:'support@vcds.de',s:'Bitte Auto-Scan vorab senden',ic:'mail'},
              ].map(s => (
                <div key={s.t} className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon name={s.ic} size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{s.t}</h3>
                  <p className="text-sm text-blue-600 font-semibold">{s.d}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Das sagen unsere Kunden</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {q:'Super Service, sehr netter Kontakt. Haben uns unheimlich geholfen! Kann man nur empfehlen!!',a:'Verifizierter VCDS-Kunde'},
                {q:'Gestern das Problem geschildert und keine 24 Stunden später hatte ich ein Leihgerät. Schneller geht es nicht. Absolut Top der Service.',a:'Autohaus Nordost Berlin'},
                {q:'Bester Laden überhaupt. Die Mitarbeiter sind super drauf und haben von der Materie Ahnung. Support ist 1A.',a:'Verifizierter VCDS-Kunde'},
              ].map((t,i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 transition-colors">
                  <Icon name="quote" size={16} className="text-blue-300 mb-3" />
                  <p className="text-sm text-slate-700 italic leading-relaxed mb-4">{t.q}</p>
                  <p className="text-xs font-semibold text-slate-400">{t.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
