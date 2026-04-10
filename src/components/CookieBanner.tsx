'use client'

import { useState, useEffect, useRef } from 'react'

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
 *
 * A11Y: Der Dialog ist modal (`aria-modal="true"`), setzt initialen Fokus auf
 * "Nur notwendige", fängt Tab/Shift-Tab zwischen den zwei Buttons ab und
 * schließt auf Escape als "ablehnen".
 */
export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [mounted, setMounted] = useState(false)
  const rejectRef = useRef<HTMLButtonElement>(null)
  const acceptRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
    }
  }, [])

  // Move focus into the dialog once it mounts and consent is still pending.
  useEffect(() => {
    if (mounted && consent === 'pending') {
      rejectRef.current?.focus()
    }
  }, [mounted, consent])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleReject()
      return
    }
    if (e.key !== 'Tab') return
    // Minimal 2-button focus trap: cycle between reject and accept.
    const active = document.activeElement
    if (e.shiftKey) {
      if (active === rejectRef.current) {
        e.preventDefault()
        acceptRef.current?.focus()
      }
    } else if (active === acceptRef.current) {
      e.preventDefault()
      rejectRef.current?.focus()
    }
  }

  // Don't render during SSR or if consent already given
  if (!mounted || consent !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einstellungen"
      onKeyDown={handleKeyDown}
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-slate-200 shadow-lg px-5 py-4 md:py-5"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-700 font-medium mb-1">Cookie-Einstellungen</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Wir verwenden technisch notwendige Cookies für den Betrieb der Website.
            Für den LiveChat-Support werden zusätzliche Cookies von Drittanbietern gesetzt.
            Unsere Webanalyse (Umami) ist cookieless und DSGVO-konform.{' '}
            <a href="/datenschutz" className="underline hover:text-primary-600 transition-colors">
              Mehr erfahren
            </a>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            ref={rejectRef}
            onClick={handleReject}
            className="px-4 py-2 text-sm border border-slate-200 rounded-btn text-slate-600 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
          >
            Nur notwendige
          </button>
          <button
            ref={acceptRef}
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-primary-600 text-white rounded-btn hover:bg-primary-500 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
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
