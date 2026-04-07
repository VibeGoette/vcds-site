import Link from 'next/link'
import { Icon } from './Icon'
import { getSiteSettings, getNavigation } from '@/lib/payload'

const fallbackCompany = {
  street: 'Herner Straße 299, Gebäude 29B',
  zipCode: '44809',
  city: 'Bochum',
  phone: '+49 (0) 234 58 545 800',
  email: 'support@vcds.de',
}

const fallbackHours = 'Mo–Fr 09:00–16:00 Uhr'

const fallbackCommunity = [
  { label: 'forum.vcds.de', url: 'https://forum.vcds.de', icon: 'chat' },
  { label: 'wiki.vcds.de', url: 'https://wiki.vcds.de', icon: 'globe' },
  { label: 'Telegram Community', url: 'https://dechat.vcds.de/', icon: 'users' },
]

const fallbackFooterNav = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'Kontakt', href: '/kontakt' },
]

export async function Footer() {
  let company = fallbackCompany
  let hours = fallbackHours
  let community = fallbackCommunity
  let footerNav = fallbackFooterNav

  try {
    const [settings, navigation] = await Promise.all([
      getSiteSettings(),
      getNavigation(),
    ])

    if (settings?.company) {
      company = {
        street: settings.company.street ?? fallbackCompany.street,
        zipCode: settings.company.zipCode ?? fallbackCompany.zipCode,
        city: settings.company.city ?? fallbackCompany.city,
        phone: settings.company.phone ?? fallbackCompany.phone,
        email: settings.company.email ?? fallbackCompany.email,
      }
    }

    if (settings?.hours?.weekdays) {
      hours = settings.hours.weekdays
    }

    if (settings?.external || settings?.social) {
      const links: typeof community = []
      if (settings.external?.forumUrl) links.push({ label: 'forum.vcds.de', url: settings.external.forumUrl, icon: 'chat' })
      if (settings.external?.wikiUrl) links.push({ label: 'wiki.vcds.de', url: settings.external.wikiUrl, icon: 'globe' })
      if (settings.social?.telegram) links.push({ label: 'Telegram Community', url: settings.social.telegram, icon: 'users' })
      if (links.length > 0) community = links
    }

    if (navigation?.footerNav?.length) {
      footerNav = (navigation.footerNav as Array<{ label: string; href: string; isExternal?: boolean }>).map((item) => ({
        label: item.label,
        href: item.href,
        isExternal: item.isExternal ?? false,
      }))
    }
  } catch {
    // CMS not available
  }

  return (
    <footer className="relative bg-slate-900 text-slate-400 overflow-hidden">
      {/* Subtle circuit pattern in footer */}
      <div className="absolute inset-0 circuit-pattern opacity-30" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 pt-14 pb-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-bold text-white text-lg tracking-tight">VCDS</span>
              <span className="text-primary-500 font-bold text-lg">.de</span>
            </div>
            <p className="text-sm leading-relaxed">Betrieben von Auto-Intern GmbH</p>
            <p className="text-sm text-slate-500">VCDS Software von Ross-Tech, LLC</p>
            <address className="text-sm not-italic mt-4 text-slate-500 leading-relaxed">
              {company.street}<br />{company.zipCode} {company.city}
            </address>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-4">Kontakt & Support</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5"><Icon name="phone" size={14} className="text-primary-400" /><span className="text-sm">{company.phone}</span></div>
              <div className="flex items-center gap-2.5"><Icon name="mail" size={14} className="text-primary-400" /><span className="text-sm">{company.email}</span></div>
              <div className="flex items-center gap-2.5"><Icon name="clock" size={14} className="text-primary-400" /><span className="text-sm">{hours}</span></div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-4">Community</p>
            <div className="space-y-3">
              {community.map(c => (
                <div key={c.url} className="flex items-center gap-2.5">
                  <Icon name={c.icon} size={14} className="text-primary-400" />
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors duration-200 link-underline">{c.label}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} Auto-Intern GmbH · Ross-Tech VCDS</p>
          <nav className="flex gap-5 text-xs" aria-label="Rechtliche Links">
            {footerNav.map(item => (
              'isExternal' in item && item.isExternal ? (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">{item.label}</a>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-white transition-colors duration-200">{item.label}</Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
