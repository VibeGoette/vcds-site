'use client'

import { Icon } from '@/components/Icon'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-5">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <Icon name="warning" size={28} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Ein Fehler ist aufgetreten</h1>
        <p className="text-sm text-slate-500 mb-6">
          Bitte versuchen Sie es erneut. Falls das Problem bestehen bleibt,
          kontaktieren Sie uns unter{' '}
          <a href="mailto:support@vcds.de" className="text-primary-600 hover:underline">support@vcds.de</a>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-500 transition-colors text-sm"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-md hover:bg-slate-50 transition-colors text-sm"
          >
            Zur Startseite
          </a>
        </div>
        {error.digest && (
          <p className="text-[10px] text-slate-300 mt-8 font-mono">Fehler-ID: {error.digest}</p>
        )}
      </div>
    </div>
  )
}
