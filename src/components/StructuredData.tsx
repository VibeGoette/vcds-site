const BASE = 'https://vcds-site.vercel.app'

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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// Product schema — for HEX-V2 and HEX-NET
export function ProductSchema({ name, description, price, sku, url }: {
  name: string; description: string; price: string; sku: string; url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: { '@type': 'Brand', name: 'Ross-Tech' },
    manufacturer: { '@type': 'Organization', name: 'Ross-Tech, LLC' },
    offers: {
      '@type': 'Offer',
      price: price.replace(/[^0-9]/g, ''),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Auto-Intern GmbH' },
      url,
    },
    sku,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
