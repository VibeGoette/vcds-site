import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  OrganizationSchema,
  ProductSchema,
  FAQSchema,
  ArticleSchema,
  SoftwareSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
  StoreSchema,
  parsePriceToSchemaValue,
} from '@/components/StructuredData'

function getJsonLd(container: HTMLElement): Record<string, unknown> {
  const script = container.querySelector('script[type="application/ld+json"]')
  expect(script).toBeTruthy()
  return JSON.parse(script!.textContent!)
}

describe('OrganizationSchema', () => {
  it('renders valid JSON-LD with correct type', () => {
    const { container } = render(<OrganizationSchema />)
    const data = getJsonLd(container)
    expect(data['@context']).toBe('https://schema.org')
    expect(data['@type']).toBe('Organization')
    expect(data.name).toBe('Auto-Intern GmbH')
  })

  it('includes address', () => {
    const { container } = render(<OrganizationSchema />)
    const data = getJsonLd(container)
    const address = data.address as Record<string, unknown>
    expect(address.addressLocality).toBe('Bochum')
    expect(address.addressCountry).toBe('DE')
  })

  it('includes contact point with hours', () => {
    const { container } = render(<OrganizationSchema />)
    const data = getJsonLd(container)
    const cp = data.contactPoint as Record<string, unknown>
    expect(cp.contactType).toBe('customer service')
    expect(cp.availableLanguage).toBe('German')
  })
})

describe('ProductSchema', () => {
  const props = {
    name: 'HEX-V2',
    description: 'VCDS USB Interface',
    price: '294€',
    sku: 'HEX-V2-3VIN',
    url: 'https://vcds.de/produkte',
  }

  it('renders valid JSON-LD with correct type', () => {
    const { container } = render(<ProductSchema {...props} />)
    const data = getJsonLd(container)
    expect(data['@type']).toBe('Product')
    expect(data.name).toBe('HEX-V2')
  })

  it('parses price to schema-compatible decimal string', () => {
    const { container } = render(<ProductSchema {...props} />)
    const data = getJsonLd(container)
    const offers = data.offers as Record<string, unknown>
    expect(offers.price).toBe('294')
    expect(offers.priceCurrency).toBe('EUR')
  })

  it('omits offers block when price has no numeric component', () => {
    const { container } = render(<ProductSchema {...props} price="auf Anfrage" />)
    const data = getJsonLd(container)
    expect(data.offers).toBeUndefined()
  })

  it('preserves decimal in price like "294,00 €"', () => {
    const { container } = render(<ProductSchema {...props} price="ab 294,00 €" />)
    const data = getJsonLd(container)
    const offers = data.offers as Record<string, unknown>
    expect(offers.price).toBe('294.00')
  })

  it('includes brand and manufacturer', () => {
    const { container } = render(<ProductSchema {...props} />)
    const data = getJsonLd(container)
    expect((data.brand as Record<string, unknown>).name).toBe('Ross-Tech')
    expect((data.manufacturer as Record<string, unknown>).name).toBe('Ross-Tech, LLC')
  })
})

describe('FAQSchema', () => {
  it('renders empty FAQ list', () => {
    const { container } = render(<FAQSchema items={[]} />)
    const data = getJsonLd(container)
    expect(data['@type']).toBe('FAQPage')
    expect(data.mainEntity).toEqual([])
  })

  it('renders FAQ items correctly', () => {
    const items = [
      { q: 'Was ist VCDS?', a: 'Diagnose-Software' },
      { q: 'Was kostet HEX-V2?', a: 'Ab 294 Euro' },
    ]
    const { container } = render(<FAQSchema items={items} />)
    const data = getJsonLd(container)
    const entities = data.mainEntity as Array<Record<string, unknown>>
    expect(entities).toHaveLength(2)
    expect(entities[0]['@type']).toBe('Question')
    expect(entities[0].name).toBe('Was ist VCDS?')
    expect((entities[0].acceptedAnswer as Record<string, unknown>).text).toBe('Diagnose-Software')
  })
})

describe('ArticleSchema', () => {
  it('renders valid article JSON-LD', () => {
    const { container } = render(
      <ArticleSchema
        title="Test Article"
        description="A test"
        datePublished="2025-01-15"
        slug="test-article"
      />
    )
    const data = getJsonLd(container)
    expect(data['@type']).toBe('Article')
    expect(data.headline).toBe('Test Article')
    expect(data.datePublished).toBe('2025-01-15')
    expect(data.mainEntityOfPage).toContain('/blog/test-article')
  })

  it('includes author and publisher', () => {
    const { container } = render(
      <ArticleSchema title="T" description="D" datePublished="2025-01-01" slug="t" />
    )
    const data = getJsonLd(container)
    expect((data.author as Record<string, unknown>).name).toBe('Auto-Intern GmbH')
    expect((data.publisher as Record<string, unknown>).name).toBe('Auto-Intern GmbH')
  })
})

describe('SoftwareSchema', () => {
  it('renders valid SoftwareApplication JSON-LD', () => {
    const { container } = render(<SoftwareSchema />)
    const data = getJsonLd(container)
    expect(data['@type']).toBe('SoftwareApplication')
    expect(data.operatingSystem).toBe('Windows')
    expect(data.name).toContain('VCDS')
  })
})

describe('BreadcrumbSchema', () => {
  it('renders breadcrumb items with positions', () => {
    const items = [
      { name: 'Start', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: 'Artikel', url: '/blog/artikel' },
    ]
    const { container } = render(<BreadcrumbSchema items={items} />)
    const data = getJsonLd(container)
    expect(data['@type']).toBe('BreadcrumbList')
    const elements = data.itemListElement as Array<Record<string, unknown>>
    expect(elements).toHaveLength(3)
    expect(elements[0].position).toBe(1)
    expect(elements[0].name).toBe('Start')
    expect(elements[2].position).toBe(3)
  })

  it('prefixes relative URLs with base', () => {
    const items = [{ name: 'Test', url: '/test' }]
    const { container } = render(<BreadcrumbSchema items={items} />)
    const data = getJsonLd(container)
    const elements = data.itemListElement as Array<Record<string, unknown>>
    expect(elements[0].item).toBe('https://vcds.de/test')
  })

  it('keeps absolute URLs as-is', () => {
    const items = [{ name: 'External', url: 'https://example.com' }]
    const { container } = render(<BreadcrumbSchema items={items} />)
    const data = getJsonLd(container)
    const elements = data.itemListElement as Array<Record<string, unknown>>
    expect(elements[0].item).toBe('https://example.com')
  })
})
