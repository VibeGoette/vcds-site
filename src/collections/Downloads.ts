import type { CollectionConfig } from 'payload'
import { publicReadAdminWrite } from '@/access'
import { validateUrl } from '@/fields/validateUrl'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: { singular: 'Download', plural: 'Downloads' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'version', 'releaseDate', 'sortOrder'],
    group: 'Inhalt',
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titel',
      admin: { description: 'z.B. "VCDS DRV (DE)", "VCDServiceReset", "Fernwartung (AnyDesk)"' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategorie',
      options: [
        { label: 'VCDS Software', value: 'vcds' },
        { label: 'Support & Fernwartung', value: 'support' },
        { label: 'Auto-Intern Multiscan', value: 'multiscan' },
        { label: 'VCDS.de Tools', value: 'tools' },
      ],
      admin: { position: 'sidebar' },
    },
    // ── Versionierung ──
    {
      name: 'version',
      type: 'text',
      label: 'Version',
      admin: { description: 'z.B. "25.3.2", "v1.1", "v2.3.0"' },
    },
    {
      name: 'dataDate',
      type: 'text',
      label: 'Datenstand',
      admin: { description: 'z.B. "29.01.2026" — Datum der Datenbasis/Label-Dateien' },
    },
    {
      name: 'releaseDate',
      type: 'date',
      label: 'Veröffentlichungsdatum',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
    // ── Download-Quelle (Datei-Upload ODER externe URL) ──
    {
      name: 'downloadSource',
      type: 'select',
      label: 'Download-Quelle',
      required: true,
      defaultValue: 'url',
      options: [
        { label: 'Externe URL (FTP/Server)', value: 'url' },
        { label: 'Datei-Upload (Payload Media)', value: 'upload' },
      ],
      admin: {
        description: 'Externe URL für FTP-Server, oder direkt eine Datei hochladen.',
      },
    },
    {
      name: 'downloadUrl',
      type: 'text',
      label: 'Download-URL (extern)',
      validate: validateUrl,
      admin: {
        description: 'Direkt-Link zum Download (z.B. https://download.ross-tech.de/drv, ftp://...)',
        condition: (data) => data?.downloadSource === 'url',
      },
    },
    {
      name: 'downloadFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Datei-Upload',
      admin: {
        description: 'Datei direkt hochladen. Wird über Payload Media ausgeliefert.',
        condition: (data) => data?.downloadSource === 'upload',
      },
    },
    // ── Beschreibung & Changelog ──
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
    },
    {
      name: 'changelog',
      type: 'textarea',
      label: 'Changelog (Markdown)',
      admin: {
        description: 'Änderungsprotokoll im Markdown-Format. Wird auf der Download-Seite angezeigt.',
        rows: 12,
      },
    },
    {
      name: 'changelogUrl',
      type: 'text',
      label: 'Changelog-URL (extern)',
      admin: {
        description: 'Link zu einem externen Changelog (falls nicht inline gepflegt).',
      },
    },
    // ── Technische Details ──
    {
      name: 'fileSize',
      type: 'text',
      label: 'Dateigröße',
      admin: {
        description: 'z.B. "45 MB", "12.3 MB", "2.1 GB"',
        position: 'sidebar',
      },
    },
    {
      name: 'checksum',
      type: 'text',
      label: 'Prüfsumme (SHA256)',
      admin: {
        description: 'SHA256-Hash zur Verifizierung der Dateiintegrität.',
      },
    },
    {
      name: 'systemRequirements',
      type: 'textarea',
      label: 'Systemanforderungen',
      admin: {
        description: 'z.B. "Windows 10/11 x64, .NET Framework 4.8, USB 2.0+"',
        rows: 3,
      },
    },
    // ── Kompatibilität ──
    {
      name: 'compatibleAdapters',
      type: 'json',
      label: 'Kompatible Adapter',
      admin: {
        description: 'Array von kompatiblen Adaptern, z.B. ["HEX-V2", "HEX-NET", "Auto-Intern Multiscan"]',
      },
    },
    {
      name: 'requirements',
      type: 'text',
      label: 'Voraussetzungen (kurz)',
      admin: { description: 'z.B. "Android 4.1+", "Nur mit HEX-NET"' },
    },
    {
      name: 'notice',
      type: 'textarea',
      label: 'Hinweis / Warnung',
      admin: { description: 'Warnhinweise, z.B. "Nur auf Anweisung des Support", "NICHT mit Windows 11 kompatibel"' },
    },
    // ── Auto-Update Manifest ──
    {
      name: 'autoUpdate',
      type: 'group',
      label: 'Auto-Update Konfiguration',
      admin: {
        description: 'Felder für den Auto-Update-Mechanismus. VCDS prüft diese Daten um Updates anzubieten.',
        condition: (data) => data?.category === 'vcds',
      },
      fields: [
        {
          name: 'isLatest',
          type: 'checkbox',
          label: 'Ist aktuelle Version',
          defaultValue: false,
          admin: {
            description: 'Markiert diese Version als die aktuelle/empfohlene Version für Auto-Updates.',
          },
        },
        {
          name: 'channel',
          type: 'select',
          label: 'Update-Kanal',
          defaultValue: 'stable',
          options: [
            { label: 'Stable (Empfohlen)', value: 'stable' },
            { label: 'Beta', value: 'beta' },
          ],
        },
        {
          name: 'minVersion',
          type: 'text',
          label: 'Min. Update-Version',
          admin: {
            description: 'Älteste Version die direkt auf diese updaten kann. z.B. "24.1.0". Leer = alle.',
          },
        },
        {
          name: 'releaseNotes',
          type: 'textarea',
          label: 'Release-Notes (kurz)',
          admin: {
            description: 'Kurze Zusammenfassung für den Update-Dialog in VCDS. Max 500 Zeichen.',
            rows: 4,
          },
          maxLength: 500,
        },
        {
          name: 'isMandatory',
          type: 'checkbox',
          label: 'Pflicht-Update',
          defaultValue: false,
          admin: {
            description: 'Wenn aktiv, wird dem Nutzer ein Update dringend empfohlen (z.B. Sicherheits-Fix).',
          },
        },
      ],
    },
    // ── Sortierung & Sichtbarkeit ──
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktiv',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
