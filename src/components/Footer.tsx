import Link from 'next/link'
import { Icon } from './Icon'

export function Footer() {
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
              Herner Straße 299, Gebäude 29B<br />44809 Bochum
            </address>
          </div>
          <div>
            <p className="font-semibold text-slate-300 text-xs mb-3">Kontakt & Support</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><Icon name="phone" size={12} className="text-slate-500" /><span className="text-xs">+49 (0) 234 58 545 800</span></div>
              <div className="flex items-center gap-2"><Icon name="mail" size={12} className="text-slate-500" /><span className="text-xs">support@vcds.de</span></div>
              <div className="flex items-center gap-2"><Icon name="clock" size={12} className="text-slate-500" /><span className="text-xs">Mo–Fr 09:00–16:00 Uhr</span></div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-300 text-xs mb-3">Community</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><Icon name="chat" size={12} className="text-slate-500" /><a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">forum.vcds.de</a></div>
              <div className="flex items-center gap-2"><Icon name="globe" size={12} className="text-slate-500" /><a href="https://wiki.vcds.de" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">wiki.vcds.de</a></div>
              <div className="flex items-center gap-2"><Icon name="users" size={12} className="text-slate-500" /><a href="https://dechat.vcds.de/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Telegram Community</a></div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[10px] text-slate-600">© {new Date().getFullYear()} Auto-Intern GmbH · Ross-Tech VCDS</p>
          <nav className="flex gap-4 text-[10px]" aria-label="Rechtliche Links">
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
