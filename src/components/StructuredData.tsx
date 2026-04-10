import { SITE_URL as BASE } from '@/lib/site-url'

/**
 * Escape `</` sequences so a CMS string containing `</script>` cannot break out
 * of the JSON-LD script tag. Standard JSON-LD embedding pattern.
 */
function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

// Organization schema — for homepage + all pages via footer
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Auto-Intern GmbH',
    alternateName: 'VCDS.de',
    url: BASE,
    logo: `${BASE}/images/logos/VCDS_Logo.png`,
    description: 'Autorisierter Vertriebspartner von Ross-Tech VCDS Diagnosesystemen in Deutschland.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Herner Straße 299, Gebäude 29B',
      addressLocality: 'Bochum',
      postalCode: '44809',
      addressCountry: 'DE',
    },
    telephone: '+49-234-58545800',
    email: 'support@vcds.de',
    sameAs: [
      'https://forum.vcds.de',
      'https://wiki.vcds.de',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-234-58545800',
      contactType: 'customer service',
      availableLanguage: 'German',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '16:00',
      },
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

/**
 * Convert a CMS free-text price like "ab 294,00 €" into a schema.org-compatible
 * string like "294.00". Returns null if no numeric component is present (e.g.
 * "auf Anfrage"), so the caller can omit the offer entirely.
 */
export function parsePriceToSchemaValue(price: string | undefined | null): string | null {
  if (!price) return null
  const match = price.match(/(\d+(?:[.,]\d+)?)/)
  if (!match) return null
  return match[1].replace(',', '.')
}

// Product schema — for HEX-V2 and HEX-NET
export function ProductSchema({ name, description, price, sku, url }: {
  name: string; description: string; price: string; sku: string; url: string
}) {
  const parsedPrice = parsePriceToSchemaValue(price)
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: { '@type': 'Brand', name: 'Ross-Tech' },
    manufacturer: { '@type': 'Organization', name: 'Ross-Tech, LLC' },
    sku,
  }
  if (parsedPrice !== null) {
    data.offers = {
      '@type': 'Offer',
      price: parsedPrice,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Auto-Intern GmbH' },
      url,
    }
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

// LocalBusiness schema — for contact/company page
export function LocalBusinessSchema({
  name, street, zipCode, city, country, phone, email, url,
}: {
  name: string; street: string; zipCode: string; city: string; country: string;
  phone?: string; email?: string; url: string;
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      postalCode: zipCode,
      addressLocality: city,
      addressCountry: country,
    },
  }
  if (phone) data.telephone = phone
  if (email) data.email = email
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

// Store schema — for dealer listings
export function StoreSchema({
  name, street, zipCode, city, country, phone, email, url, description,
}: {
  name: string; street?: string; zipCode?: string; city: string; country: string;
  phone?: string; email?: string; url: string; description?: string;
}) {
  const address: Record<string, unknown> = {
    '@type': 'PostalAddress',
    addressLocality: city,
    addressCountry: country,
  }
  if (street) address.streetAddress = street
  if (zipCode) address.postalCode = zipCode
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name,
    url,
    address,
  }
  if (phone) data.telephone = phone
  if (email) data.email = email
  if (description) data.description = description
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

// FAQ schema — for FAQ page
export function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(i => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

// Article schema — for blog posts
export function ArticleSchema({ title, description, datePublished, slug }: {
  title: string; description: string; datePublished: string; slug: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    author: { '@type': 'Organization', name: 'Auto-Intern GmbH' },
    publisher: {
      '@type': 'Organization',
      name: 'Auto-Intern GmbH',
      url: BASE,
    },
    mainEntityOfPage: `${BASE}/blog/${slug}`,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

// SoftwareApplication schema — for download page
export function SoftwareSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VCDS (VAG-COM Diagnostic System)',
    operatingSystem: 'Windows',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '294',
      priceCurrency: 'EUR',
    },
    author: { '@type': 'Organization', name: 'Ross-Tech, LLC' },
    description: 'Diagnosesoftware fuer VW, Audi, Skoda, Seat und weitere Fahrzeuge der Volkswagen-Gruppe.',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}

// BreadcrumbList schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE}${item.url}`,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
}
