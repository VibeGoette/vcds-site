'use client'
import { useState, useEffect } from 'react'
import { Icon } from '@/components/Icon'

function isBusinessHours(): boolean {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 6=Sat
  const hour = now.getHours()
  const minute = now.getMinutes()
  const timeInMinutes = hour * 60 + minute
  // Mo-Fr 9:00-16:00 (540-960 minutes)
  return day >= 1 && day <= 5 && timeInMinutes >= 540 && timeInMinutes < 960
}

function getNextAvailable(): string {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()

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
    // LiveChat.com widget trigger
    if (typeof window !== 'undefined') {
      const lc = (window as Record<string, unknown>).LiveChatWidget as { call?: (method: string) => void } | undefined
      if (lc?.call) {
        lc.call('maximize')
        return
      }
      // Fallback: open LiveChat directly
      window.open('https://direct.lc.chat/17285498/', '_blank')
    }
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
