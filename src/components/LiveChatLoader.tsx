'use client'

import { useEffect } from 'react'
import { useCookieConsent } from './CookieBanner'

/**
 * Loads LiveChat.com widget only after user accepts cookies (DSGVO-compliant).
 * LiveChat sets third-party cookies and transmits data to LiveChat servers.
 */
export function LiveChatLoader() {
  const consent = useCookieConsent()

  useEffect(() => {
    if (consent !== 'accepted') return

    // Prevent double-loading
    if (document.getElementById('livechat-script')) return

    const w = window as unknown as Record<string, unknown>
    w.__lc = w.__lc || {}
    ;(w.__lc as Record<string, unknown>).license = 17285498

    const script = document.createElement('script')
    script.id = 'livechat-script'
    script.async = true
    script.src = 'https://cdn.livechatinc.com/tracking.js'
    document.head.appendChild(script)
  }, [consent])

  return null
}
