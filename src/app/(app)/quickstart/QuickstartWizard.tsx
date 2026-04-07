'use client'
import { useState } from 'react'
import { Icon } from '@/components/Icon'

const steps = [
  { t:'VCDS Setup starten', d:'Starten Sie das Installationsprogramm von Ihrem USB-Stick oder aus dem Download-Bereich.' },
  { t:'Treiber installieren', d:'Wählen Sie "Installieren", wenn Sie nach der Gerätesoftware gefragt werden.' },
  { t:'Fertigstellen', d:'Die nötigen Treiber wurden installiert. Wählen Sie "Fertig stellen".' },
  { t:'VCDS starten', d:'Starten Sie VCDS und wählen Sie "Einstellungen".' },
  { t:'Anschlusstest', d:'Klicken Sie auf "Anschlusstest" und warten Sie auf die Bestätigung.' },
  { t:'Konfiguration öffnen', d:'Klicken Sie auf "Konfiguration".' },
  { t:'Registrierung wählen', d:'Wählen Sie die Registerkarte "Registrierung".' },
  { t:'Formular ausfüllen', d:'Lesen Sie die Datenschutzhinweise, setzen Sie den Haken und füllen Sie die Pflichtfelder aus.' },
  { t:'E-Mail prüfen', d:'Vergewissern Sie sich, dass die E-Mail-Adresse korrekt ist. An diese wird die Transaktions-ID gesendet.' },
  { t:'Registrierung absenden', d:'Klicken Sie auf "Registrierungsanfrage absenden".' },
  { t:'Transaktions-ID eingeben', d:'Geben Sie die Transaktions-ID aus der E-Mail ein.' },
  { t:'Abschließen', d:'Klicken Sie auf "Registrierung abschließen".' },
  { t:'Lizenzstatus prüfen', d:'Kontrollieren Sie unter "Über" den Lizenzstatus. Grüner Text = Ihr Adapter ist einsatzbereit!' },
]

export const stepCount = steps.length

export function QuickstartWizard() {
  const [step, setStep] = useState(0)
  const pct = ((step + 1) / steps.length) * 100

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 space-y-8">
      {/* Prerequisites */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{ic:'plug',l:'Adapter',s:'HEX-V2 / NET'},{ic:'usb',l:'USB-Kabel',s:'Mitgeliefert'},{ic:'download',l:'Software',s:'USB / Download'},{ic:'globe',l:'Windows-PC',s:'Kein Mac'}].map(p => (
          <div key={p.l} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
            <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center mx-auto mb-2"><Icon name={p.ic} size={16} className="text-primary-600" /></div>
            <p className="text-xs font-semibold text-slate-700">{p.l}</p>
            <p className="text-[10px] text-slate-400">{p.s}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Schritt {step+1} von {steps.length}</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-primary-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Step Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 py-14 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-3">{step+1}</div>
            <p className="text-xs text-slate-400">Screenshot-Bereich</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Schritt {step+1}</p>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{steps[step].t}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{steps[step].d}</p>
        </div>
        <div className="border-t border-slate-100 px-5 py-4 flex items-center justify-between">
          <button onClick={() => setStep(Math.max(0,step-1))} disabled={step===0}
            aria-label="Vorheriger Schritt"
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 disabled:opacity-30 transition-colors py-2 px-3 -ml-3 min-h-[44px]">
            <Icon name="arrow" size={14} className="rotate-180" />Zurück
          </button>
          <div className="hidden sm:flex gap-1">
            {steps.map((_,i) => (
              <button key={i} onClick={() => setStep(i)} aria-label={`Schritt ${i+1}`}
                className={`w-3 h-3 rounded-full transition-all ${i === step ? 'bg-primary-600 scale-125' : i < step ? 'bg-primary-300' : 'bg-slate-200'}`} />
            ))}
          </div>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step+1)} aria-label="Nächster Schritt" className="flex items-center gap-1 px-5 py-2.5 bg-primary-600 text-white rounded-md text-sm font-semibold hover:bg-primary-500 active:bg-primary-700 transition-colors min-h-[44px]">
              Weiter<Icon name="arrow" size={14} className="text-white" />
            </button>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold">
              <Icon name="check" size={14} className="text-white" />Fertig
            </span>
          )}
        </div>
      </div>

      {step === steps.length - 1 && (
        <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><Icon name="shield" size={22} className="text-green-600" /></div>
          <h2 className="text-lg font-bold text-green-900 mb-2">Ihr VCDS-Adapter ist einsatzbereit!</h2>
          <p className="text-sm text-green-700 mb-5">Wir wünschen Ihnen viel Erfolg. Bei Fragen erreichen Sie uns unter +49 (0) 234 58 545 800.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="https://forum.vcds.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary-600 font-medium hover:underline"><Icon name="chat" size={14} className="text-primary-500" />Forum</a>
            <a href="https://wiki.vcds.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary-600 font-medium hover:underline"><Icon name="globe" size={14} className="text-primary-500" />Wiki</a>
            <a href="https://dechat.vcds.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary-600 font-medium hover:underline"><Icon name="users" size={14} className="text-primary-500" />Telegram</a>
          </div>
        </div>
      )}
    </div>
  )
}
