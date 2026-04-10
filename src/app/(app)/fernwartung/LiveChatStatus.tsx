'use client'
import { useState, useEffect } from 'react'
import { Icon } from '@/components/Icon'

const BUSINESS_START = 9 * 60  // 9:00
const BUSINESS_END = 16 * 60   // 16:00
const LIVECHAT_URL = 'https://direct.lc.chat/17285498/'

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
}

/**
 * Returns the current date/time components in Europe/Berlin.
 *
 * Uses `Intl.DateTimeFormat.formatToParts` rather than the old
 * `new Date(toLocaleString(...))` trick, which is unspecified and produces
 * different results in Safari/Firefox vs Chrome.
 */
function getBerlinNow(): { day: number; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? ''
  // Intl can return '24' for midnight in hour12:false mode — normalise to 0.
  const hour = Number(get('hour')) % 24
  return {
    day: WEEKDAY_INDEX[get('weekday')] ?? 0,
    hour,
    minute: Number(get('minute')),
  }
}

/** Check business hours in German timezone (Europe/Berlin) */
function isBusinessHours(): boolean {
  const { day, hour, minute } = getBerlinNow()
  const timeInMinutes = hour * 60 + minute
  return day >= 1 && day <= 5 && timeInMinutes >= BUSINESS_START && timeInMinutes < BUSINESS_END
}

function getNextAvailable(): string {
  const { day, hour } = getBerlinNow()

  if (day === 0) return 'Montag ab 9:00 Uhr'
  if (day === 6) return 'Montag ab 9:00 Uhr'
  if (hour >= 16) {
    if (day === 5) return 'Montag ab 9:00 Uhr'
    return 'morgen ab 9:00 Uhr'
  }
  if (hour < 9) return 'heute ab 9:00 Uhr'
  return ''
}

export function LiveChatStatus() {
  const [online, setOnline] = useState(false)
  const [nextTime, setNextTime] = useState('')

  useEffect(() => {
    const check = () => {
      setOnline(isBusinessHours())
      setNextTime(getNextAvailable())
    }
    check()
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
  }, [])

  const openChat = () => {
    if (typeof window === 'undefined') return
    try {
      const widget = (window as unknown as Record<string, unknown>).LiveChatWidget as
        | { call?: (method: string) => void }
        | undefined
      if (widget?.call) {
        widget.call('maximize')
        return
      }
    } catch {
      // Widget not loaded
    }
    window.open(LIVECHAT_URL, '_blank')
  }

  return (
    <div className={`rounded-xl border p-5 transition-colors ${online ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${online ? 'bg-emerald-100' : 'bg-slate-200'}`}>
          <Icon name="chat" size={16} className={online ? 'text-emerald-600' : 'text-slate-500'} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">LiveChat</h3>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span className={`text-xs font-medium ${online ? 'text-emerald-700' : 'text-slate-500'}`}>
              {online ? 'Jetzt verfügbar' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {online ? (
        <button
          onClick={openChat}
          aria-label="LiveChat öffnen"
          className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 active:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
        >
          <Icon name="chat" size={14} />
          Chat starten
        </button>
      ) : (
        <div className="py-3 px-4 bg-white rounded-lg border border-slate-200 text-center">
          <p className="text-sm text-slate-600 font-medium">Mo–Fr 9:00–16:00 Uhr</p>
          {nextTime && <p className="text-xs text-slate-400 mt-1">Wieder erreichbar {nextTime}</p>}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed text-center">
        Sofortige Hilfe von unserem Team
      </p>
    </div>
  )
}
