'use client'

import { useState, useEffect } from 'react'

const CONSENT_KEY = 'vcds-cookie-consent'

type ConsentState = 'pending' | 'accepted' | 'rejected'

/**
 * DSGVO-konformer Cookie-Banner.
 *
 * - Umami Analytics ist cookieless → braucht keine Einwilligung
 * - LiveChat setzt Cookies → braucht Einwilligung
 * - Payload CMS Session-Cookie ist technisch notwendig → kein Consent noetig
 *
 * Consent wird in localStorage gespeichert (kein Cookie fuer den Cookie-Banner selbst).
 */
export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
  }

  // Don't render during SSR or if consent already given
  if (!mounted || consent !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-slate-200 shadow-lg px-5 py-4 md:py-5"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-700 font-medium mb-1">Cookie-Einstellungen</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Wir verwenden technisch notwendige Cookies fuer den Betrieb der Website.
            Fuer den LiveChat-Support werden zusaetzliche Cookies von Drittanbietern gesetzt.
            Unsere Webanalyse (Umami) ist cookieless und DSGVO-konform.{' '}
            <a href="/datenschutz" className="underline hover:text-primary-600 transition-colors">
              Mehr erfahren
            </a>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm border border-slate-200 rounded-btn text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Nur notwendige
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-primary-600 text-white rounded-btn hover:bg-primary-500 transition-colors"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook to check if LiveChat/third-party cookies are accepted.
 * Use this to conditionally load third-party scripts.
 */
export function useCookieConsent(): ConsentState {
  const [consent, setConsent] = useState<ConsentState>('pending')

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted') setConsent('accepted')
    else if (stored === 'rejected') setConsent('rejected')
  }, [])

  return consent
}
