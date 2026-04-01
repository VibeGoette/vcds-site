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
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-5 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="font-bold text-white text-base">VCDS</span>
              <span className="text-slate-600 font-bold text-base">.de</span>
            </div>
            <p className="text-xs leading-relaxed">Betrieben von Auto-Intern GmbH</p>
            <p className="text-xs">VCDS Software von Ross-Tech, LLC</p>
            <address className="text-xs not-italic mt-3 text-slate-500">
              {company.street}<br />{company.zipCode} {company.city}
            </address>
          </div>
          <div>
            <p className="font-semibold text-slate-300 text-xs mb-3">Kontakt & Support</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><Icon name="phone" size={12} className="text-slate-500" /><span className="text-xs">{company.phone}</span></div>
              <div className="flex items-center gap-2"><Icon name="mail" size={12} className="text-slate-500" /><span className="text-xs">{company.email}</span></div>
              <div className="flex items-center gap-2"><Icon name="clock" size={12} className="text-slate-500" /><span className="text-xs">{hours}</span></div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-300 text-xs mb-3">Community</p>
            <div className="space-y-2">
              {community.map(c => (
                <div key={c.url} className="flex items-center gap-2">
                  <Icon name={c.icon} size={12} className="text-slate-500" />
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">{c.label}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[10px] text-slate-600">© {new Date().getFullYear()} Auto-Intern GmbH · Ross-Tech VCDS</p>
          <nav className="flex gap-4 text-[10px]" aria-label="Rechtliche Links">
            {footerNav.map(item => (
              'isExternal' in item && item.isExternal ? (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{item.label}</a>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
