import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Icon } from '@/components/Icon'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <Icon name="search" size={28} className="text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Seite nicht gefunden</h1>
          <p className="text-slate-500 mb-8">Die gesuchte Seite existiert leider nicht. Vielleicht hilft einer dieser Links weiter:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-md font-semibold text-sm hover:bg-blue-500 transition-colors">
              Zur Startseite
            </Link>
            <Link href="/produkte" className="px-5 py-2.5 border border-slate-200 text-slate-700 rounded-md font-semibold text-sm hover:bg-slate-50 transition-colors">
              Produkte ansehen
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
            <Link href="/kontakt" className="hover:text-blue-600 transition-colors">Kontakt</Link>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link href="/download" className="hover:text-blue-600 transition-colors">Download</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
