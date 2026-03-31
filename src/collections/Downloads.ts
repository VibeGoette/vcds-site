import type { CollectionConfig } from 'payload'
import { publicReadAdminWrite } from '@/access'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  labels: { singular: 'Download', plural: 'Downloads' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'version', 'sortOrder'],
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
      admin: { description: 'z.B. "29.01.2026"' },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
    },
    {
      name: 'downloadUrl',
      type: 'text',
      required: true,
      label: 'Download-URL',
      admin: { description: 'Direkt-Link zum Download (ross-tech.de, vcds.de/wp-content, etc.)' },
    },
    {
      name: 'changelogUrl',
      type: 'text',
      label: 'Changelog-URL',
    },
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
      label: 'Voraussetzungen',
      admin: { description: 'z.B. "Android 4.1+", "Windows 10 x64", "Nur mit HEX-NET"' },
    },
    {
      name: 'notice',
      type: 'textarea',
      label: 'Hinweis',
      admin: { description: 'Warnhinweise, z.B. "Nur auf Anweisung des Support", "NICHT mit Windows 11 kompatibel"' },
    },
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
