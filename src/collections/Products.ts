import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { seoFields } from '@/fields/seo'
import { publicReadAdminWrite } from '@/access'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Produkt', plural: 'Produkte' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'sortOrder'],
    group: 'Inhalt',
  },
  access: publicReadAdminWrite,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Produktname',
      admin: { description: 'z.B. "VCDS HEX-V2", "VCDS HEX-NET", "HEX-V2 Upgrade"' },
    },
    slugField('name'),
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Kategorie',
      options: [
        { label: 'HEX-V2', value: 'hex-v2' },
        { label: 'HEX-NET', value: 'hex-net' },
        { label: 'Diagnose-Adapter', value: 'adapter' },
        { label: 'Diagnose-Komplettsysteme', value: 'komplettsysteme' },
        { label: 'Upgrades', value: 'upgrades' },
        { label: 'Zubehör', value: 'zubehoer' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Preis (Anzeige)',
      admin: {
        description: 'Freitext für flexible Darstellung, z.B. "ab 294 €", "ab 514 €", "auf Anfrage"',
      },
    },
    {
      name: 'shopUrl',
      type: 'text',
      label: 'Shop-Link',
      admin: {
        description: 'Direkt-Link zum Produkt im Auto-Intern Shop.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hauptbild',
      admin: {
        description: 'Wird auf Produktseite, Homepage und in Blog-Einbettungen angezeigt. Empfohlen: 1200×800px (Querformat), PNG oder WebP. Wird automatisch in 5 Größen generiert (Thumbnail, Mobile 480px, Card 800px, Desktop 1200px, Hero 1920px).',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Bildergalerie',
      admin: { description: 'Weitere Produktbilder (seitlich, oben, im Koffer etc.). Empfohlen: 1200×800px, PNG/WebP/JPEG.' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      maxLength: 300,
      admin: {
        description: 'Für Produktkarten und Übersichtsseiten. Max 300 Zeichen.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Ausführliche Beschreibung',
    },
    // ── Produkt-Highlights (Feature-Liste) ──
    {
      name: 'highlights',
      type: 'array',
      label: 'Produkt-Highlights',
      admin: { description: 'Feature-Liste für die Produktseite.' },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Highlight',
          admin: {
            description: 'z.B. "Voller Funktionsumfang der VCDS-Diagnosesoftware"',
          },
        },
      ],
    },
    // ── Lizenzmodelle (VIN-Varianten) ──
    {
      name: 'variants',
      type: 'array',
      label: 'Lizenzmodelle / Varianten',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Variante',
          admin: { description: 'z.B. "3 VIN – Hobby", "10 VIN – Enthusiast", "Unlimited – Professional"' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
          admin: { description: 'z.B. "Für die Familienflotte. Bis zu drei Fahrzeuge auslesen, codieren und diagnostizieren."' },
        },
        {
          name: 'price',
          type: 'text',
          label: 'Preis',
        },
        {
          name: 'shopUrl',
          type: 'text',
          label: 'Shop-Link (für diese Variante)',
        },
      ],
    },
    // ── Kompatibilität ──
    {
      name: 'compatibility',
      type: 'text',
      label: 'Fahrzeug-Kompatibilität',
      admin: {
        description: 'z.B. "Alle VW-Modelle bis 2025", "Baujahre ab 2017"',
      },
    },
    {
      name: 'connection',
      type: 'select',
      label: 'Verbindungstyp',
      options: [
        { label: 'USB (kabelgebunden)', value: 'usb' },
        { label: 'WLAN + USB', value: 'wifi-usb' },
        { label: 'Sonstige', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    // ── Sortierung & Sichtbarkeit ──
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Niedrigere Zahl = weiter vorne. Standard: 0.',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktiv (auf der Website anzeigen)',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
