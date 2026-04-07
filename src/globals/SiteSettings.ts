import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Website-Einstellungen',
  admin: {
    group: 'Einstellungen',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    // ── Firmen-Daten ──
    {
      name: 'company',
      type: 'group',
      label: 'Firmendaten',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Auto-Intern GmbH', label: 'Firmenname' },
        { name: 'street', type: 'text', defaultValue: 'Herner Straße 299, Gebäude 29B', label: 'Straße' },
        { name: 'zipCode', type: 'text', defaultValue: '44809', label: 'PLZ' },
        { name: 'city', type: 'text', defaultValue: 'Bochum', label: 'Ort' },
        { name: 'country', type: 'text', defaultValue: 'Deutschland', label: 'Land' },
        { name: 'phone', type: 'text', defaultValue: '+49 (0) 234 58 545 800', label: 'Telefon' },
        { name: 'email', type: 'email', defaultValue: 'support@vcds.de', label: 'E-Mail (Support)' },
        { name: 'emailSales', type: 'email', defaultValue: 'info@vcds.de', label: 'E-Mail (Allgemein)' },
      ],
    },
    // ── Öffnungszeiten ──
    {
      name: 'hours',
      type: 'group',
      label: 'Support-Zeiten',
      fields: [
        { name: 'weekdays', type: 'text', defaultValue: 'Mo–Fr: 09:00 – 16:00 Uhr', label: 'Wochentags' },
        { name: 'note', type: 'text', label: 'Hinweis', admin: { description: 'z.B. "Bei Supportanfragen bitte vor dem Anruf einen Auto-Scan per Mail schicken!"' } },
      ],
    },
    // ── Social Media & externe Links ──
    {
      name: 'social',
      type: 'group',
      label: 'Social Media & Community',
      fields: [
        { name: 'facebook', type: 'text', defaultValue: 'https://www.facebook.com/VCDS.de/', label: 'Facebook Page' },
        { name: 'facebookGroup', type: 'text', defaultValue: 'https://www.facebook.com/groups/557864484381349', label: 'Facebook Gruppe' },
        { name: 'telegram', type: 'text', defaultValue: 'https://dechat.vcds.de/', label: 'Telegram' },
        { name: 'youtube', type: 'text', defaultValue: 'https://www.youtube.com/@vcdsde7922', label: 'YouTube' },
      ],
    },
    // ── Externe Plattformen ──
    {
      name: 'external',
      type: 'group',
      label: 'Externe Plattformen',
      fields: [
        { name: 'shopUrl', type: 'text', defaultValue: 'https://auto-intern.de/shop/', label: 'Shop (Auto-Intern)' },
        { name: 'forumUrl', type: 'text', defaultValue: 'https://forum.vcds.de/', label: 'Forum' },
        { name: 'wikiUrl', type: 'text', defaultValue: 'https://wiki.vcds.de/de/home', label: 'Wiki' },
      ],
    },
    // ── Analytics ──
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics (DSGVO-konform)',
      fields: [
        { name: 'umamiSiteId', type: 'text', label: 'Umami Site-ID' },
        { name: 'umamiUrl', type: 'text', label: 'Umami Script-URL', admin: { description: 'z.B. https://analytics.vcds.de/script.js' } },
      ],
    },
    // ── SEO Global ──
    {
      name: 'seoGlobal',
      type: 'group',
      label: 'SEO (Global)',
      fields: [
        { name: 'siteName', type: 'text', defaultValue: 'VCDS.de', label: 'Site-Name' },
        { name: 'titleSuffix', type: 'text', defaultValue: ' | VCDS.de', label: 'Title-Suffix', admin: { description: 'Wird an jeden Seitentitel angehängt.' } },
        { name: 'defaultDescription', type: 'textarea', defaultValue: 'VCDS Diagnoseadapter von Ross-Tech für VW, Audi, Skoda, Seat. Erstklassiger Support aus Bochum.', label: 'Standard Meta-Description' },
        { name: 'googleSiteVerification', type: 'text', label: 'Google Site Verification' },
        { name: 'bingSiteVerification', type: 'text', label: 'Bing Site Verification' },
      ],
    },
  ],
}
