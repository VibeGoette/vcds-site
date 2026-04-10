import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/ui/PageHero'
import { Card } from '@/components/ui/Card'
import { IconBox } from '@/components/ui/IconBox'
import { Section } from '@/components/ui/Section'
import { getTeamMembers, getSiteSettings } from '@/lib/payload'
import { ContactForm } from './ContactForm'
import { getPageSeo } from '@/lib/seo'
import type { Metadata } from 'next'
import { LocalBusinessSchema } from '@/components/StructuredData'
import { SITE_URL } from '@/lib/site-url'
import { stripTel } from '@/lib/phone'

export async function generateMetadata(): Promise<Metadata> {
  return getPageSeo('kontakt', {
  title: 'Kontakt',
  description: 'Kontaktieren Sie das VCDS Support-Team der Auto-Intern GmbH in Bochum.',
})
}

const fallbackTeam = [
  { name:'Nils', role:'VCDS Support', bio:'Spezialist für Umbauten, Codierungen und Retrofit. Aus der Community zum Team gestoßen.', motto:'Man kann nicht alles aus dem 255 wissen!' },
  { name:'Wolfgang', role:'VCDS Support · KFZ-Meister', bio:'Kaum jemand hat so viel Wissen und Sachverstand. Bevor ein Problem existiert, kennt Wolfgang die Lösung.', motto:'Es gibt kein schlechtes Wetter für Motorradfahren, nur falsche Ausstattung!' },
  { name:'Jürgen', role:'VCDS Support · KFZ-Meister', bio:'Oszilloskop-Experte. Seine Stärke: Wissen einfach und trotzdem umfangreich vermitteln.', motto:'Probleme sind wie dafür gemacht, dass mein Oszilloskop tätig wird!' },
]

const fallbackContact = {
  address: 'Herner Str. 299, Geb. 29B, 44809 Bochum',
  phone: '+49 (0) 234 58 54 58 00',
  email: 'support@vcds.de',
  hours: 'Mo–Fr: 09:00–16:00 Uhr',
  note: 'Bei Supportanfragen bitte vor dem Anruf einen Auto-Scan per Mail schicken!',
}

const fallbackLocalBusiness = {
  name: 'Auto-Intern GmbH',
  street: 'Herner Straße 299, Gebäude 29B',
  zipCode: '44809',
  city: 'Bochum',
  country: 'DE',
  phone: '+49 234 58 545 800',
  email: 'support@vcds.de',
}

export default async function Kontakt() {
  let team = fallbackTeam
  let contact = fallbackContact
  let localBusiness = fallbackLocalBusiness

  try {
    const [cmsTeam, settings] = await Promise.all([
      getTeamMembers(),
      getSiteSettings(),
    ])

    if (cmsTeam.length > 0) {
      team = cmsTeam.map(m => ({
        name: m.name,
        role: m.role,
        bio: m.bio,
        motto: m.motto ?? '',
      }))
    }

    if (settings?.company) {
      contact = {
        address: `${settings.company.street ?? ''}, ${settings.company.zipCode ?? ''} ${settings.company.city ?? ''}`,
        phone: settings.company.phone ?? fallbackContact.phone,
        email: settings.company.email ?? fallbackContact.email,
        hours: settings.hours?.weekdays ?? fallbackContact.hours,
        note: settings.hours?.note ?? fallbackContact.note,
      }
      localBusiness = {
        name: settings.company.name ?? fallbackLocalBusiness.name,
        street: settings.company.street ?? fallbackLocalBusiness.street,
        zipCode: settings.company.zipCode ?? fallbackLocalBusiness.zipCode,
        city: settings.company.city ?? fallbackLocalBusiness.city,
        country: settings.company.country ?? fallbackLocalBusiness.country,
        phone: settings.company.phone ?? fallbackLocalBusiness.phone,
        email: settings.company.email ?? fallbackLocalBusiness.email,
      }
    }
  } catch {
    // CMS not available
  }

  return (
    <>
      <LocalBusinessSchema {...localBusiness} url={SITE_URL} />
      <Header />
      <main id="main">
        <PageHero
          breadcrumb="Start / Kontakt"
          title="Kontakt"
          description="Das Team der Auto-Intern GmbH hilft Ihnen gerne weiter — per Telefon, E-Mail oder Chat."
        />

        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Kontaktformular</h2>
              <ContactForm />
            </div>
            <aside className="lg:col-span-2 space-y-6">
              <Card variant="muted">
                <h3 className="font-bold text-slate-900 mb-4">Auto-Intern GmbH</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><Icon name="map" size={16} className="text-slate-400" /><span className="text-sm text-slate-600">{contact.address}</span></div>
                  <div className="flex items-center gap-3"><Icon name="phone" size={16} className="text-slate-400" /><a href={`tel:${stripTel(contact.phone)}`} className="text-sm text-primary-600 font-semibold hover:underline">{contact.phone}</a></div>
                  <div className="flex items-center gap-3"><Icon name="mail" size={16} className="text-slate-400" /><span className="text-sm text-slate-600">{contact.email}</span></div>
                  <div className="flex items-center gap-3"><Icon name="clock" size={16} className="text-slate-400" /><span className="text-sm text-slate-500">{contact.hours}</span></div>
                </div>
                <div className="flex items-start gap-2 mt-4 pt-3 border-t border-slate-200/50">
                  <Icon name="mail" size={12} className="text-primary-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500">E-Mails werden <strong className="text-slate-700">Mo–Fr bis 17:00 Uhr</strong> bearbeitet.</p>
                </div>
                {contact.note && <p className="text-xs text-slate-400 mt-2">{contact.note}</p>}
              </Card>
              <Card className="bg-primary-50 border-primary-100">
                <h3 className="font-bold text-slate-900 mb-3">Selbst informieren</h3>
                <div className="space-y-2">
                  <a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-600 hover:underline"><Icon name="chat" size={14} className="text-primary-400" />forum.vcds.de</a>
                  <a href="https://wiki.vcds.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-600 hover:underline"><Icon name="globe" size={14} className="text-primary-400" />wiki.vcds.de</a>
                  <a href="https://dechat.vcds.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-600 hover:underline"><Icon name="users" size={14} className="text-primary-400" />Telegram Community</a>
                </div>
              </Card>
            </aside>
          </div>
        </div>

        <Section variant="muted">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Unser Team</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {team.map(m => (
              <Card key={m.name} variant="interactive">
                <IconBox icon="users" shape="circle" className="mb-4" />
                <h3 className="font-bold text-slate-900 text-lg">{m.name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-3">{m.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{m.bio}</p>
                {m.motto && <p className="text-sm text-slate-400 italic">{m.motto}</p>}
              </Card>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
