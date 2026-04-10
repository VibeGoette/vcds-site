/**
 * Server-safe metadata for the 7 hardcoded blog posts.
 * This file has no 'use client' directive so it can be imported in Server Components.
 * The full Post type (including visual: React.ReactNode) lives in BlogPostClient.tsx.
 */

export type PostMeta = {
  slug: string
  title: string
  subtitle: string
  cat: string
  catLabel: string
  date: string
  reading: string
  gradient: string
  gradientCSS: string
  icon: string
}

export const HARDCODED_POSTS: Record<string, PostMeta> = {
  'warum-kein-vcds-crack': {
    slug: 'warum-kein-vcds-crack',
    title: 'VCDS Crack Download Deutsch',
    subtitle: 'Warum gecrackte VCDS-Software keine Option ist',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '27. Oktober 2025',
    reading: '4 Min',
    gradient: 'from-red-700 via-red-600 to-orange-500',
    gradientCSS: '#991b1b,#ea580c',
    icon: 'warning',
  },
  'qual-der-wahl-vcds': {
    slug: 'qual-der-wahl-vcds',
    title: 'HEX-V2 vs. HEX-NET',
    subtitle: 'Der grosse Vergleich — welcher Adapter passt zu Ihnen?',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '22. Mai 2025',
    reading: '5 Min',
    gradient: 'from-primary-700 via-primary-600 to-cyan-500',
    gradientCSS: '#1d4ed8,#06b6d4',
    icon: 'bolt',
  },
  'fin-verbrauch-bei-vcds': {
    slug: 'fin-verbrauch-bei-vcds',
    title: 'FIN-Verbrauch bei VCDS',
    subtitle: 'Welche Funktionen verbrauchen eine FIN und welche nicht?',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '4. April 2025',
    reading: '3 Min',
    gradient: 'from-emerald-700 via-emerald-600 to-teal-500',
    gradientCSS: '#047857,#14b8a6',
    icon: 'shield',
  },
  'welches-vcds-kaufen': {
    slug: 'welches-vcds-kaufen',
    title: 'Welches VCDS kaufen?',
    subtitle: 'Einsatzzweck, Fahrzeuganzahl und Budget',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '5. Februar 2025',
    reading: '6 Min',
    gradient: 'from-violet-700 via-violet-600 to-purple-500',
    gradientCSS: '#6d28d9,#a855f7',
    icon: 'search',
  },
  'gute-wahl-vcds': {
    slug: 'gute-wahl-vcds',
    title: 'Eine gute Wahl',
    subtitle: 'Warum VCDS die Diagnose-Landschaft veraendert hat',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '31. Januar 2025',
    reading: '3 Min',
    gradient: 'from-slate-800 via-slate-700 to-slate-600',
    gradientCSS: '#1e293b,#475569',
    icon: 'check',
  },
  'update-25-3-1': {
    slug: 'update-25-3-1',
    title: 'Update 25.3.1',
    subtitle: 'Datenstand: 22. April 2025',
    cat: 'versionshistorie',
    catLabel: 'Release',
    date: '23. April 2025',
    reading: '2 Min',
    gradient: 'from-emerald-700 via-green-600 to-lime-500',
    gradientCSS: '#047857,#84cc16',
    icon: 'download',
  },
  'vorsicht-vor-gefaelschten-vcds-interfaces': {
    slug: 'vorsicht-vor-gefaelschten-vcds-interfaces',
    title: 'Gefaelschte VCDS-Interfaces',
    subtitle: 'So erkennen Sie Originale und schuetzen sich',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '17. Januar 2025',
    reading: '4 Min',
    gradient: 'from-amber-700 via-amber-600 to-yellow-500',
    gradientCSS: '#b45309,#eab308',
    icon: 'warning',
  },
  'zugriffsberechtigungscodes-was-man-wissen-sollte': {
    slug: 'zugriffsberechtigungscodes-was-man-wissen-sollte',
    title: 'Zugriffsberechtigungscodes',
    subtitle: 'PDF kaufen? Nicht mit VCDS.',
    cat: 'beratung',
    catLabel: 'Beratung',
    date: '21. Oktober 2024',
    reading: '3 Min',
    gradient: 'from-indigo-700 via-indigo-600 to-primary-500',
    gradientCSS: '#4338ca,#3b82f6',
    icon: 'cog',
  },
}

export const HARDCODED_SLUGS = new Set(Object.keys(HARDCODED_POSTS))
