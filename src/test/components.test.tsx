import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from '@/components/Icon'
import { InfoBox } from '@/components/ui/InfoBox'

describe('Icon', () => {
  it('renders an SVG with aria-hidden', () => {
    const { container } = render(<Icon name="check" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders with custom size', () => {
    const { container } = render(<Icon name="check" size={24} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('width')).toBe('24')
    expect(svg?.getAttribute('height')).toBe('24')
  })

  it('renders with custom className', () => {
    const { container } = render(<Icon name="check" className="text-red-500" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toContain('text-red-500')
  })

  it('renders known icon path', () => {
    const { container } = render(<Icon name="check" />)
    const path = container.querySelector('path')
    expect(path).toBeTruthy()
  })

  it('renders empty for unknown icon', () => {
    const { container } = render(<Icon name="nonexistent-icon" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    // SVG exists but has no child path
    expect(svg?.querySelector('path')).toBeNull()
  })
})

describe('InfoBox', () => {
  it('renders children', () => {
    render(<InfoBox>Test content</InfoBox>)
    expect(screen.getByText('Test content')).toBeTruthy()
  })

  it('renders title when provided', () => {
    render(<InfoBox title="Hinweis">Content</InfoBox>)
    expect(screen.getByText('Hinweis')).toBeTruthy()
  })

  it('does not render title element when not provided', () => {
    const { container } = render(<InfoBox>Content only</InfoBox>)
    const headings = container.querySelectorAll('h3')
    expect(headings.length).toBe(0)
  })

  it('renders info variant by default', () => {
    const { container } = render(<InfoBox>Info content</InfoBox>)
    const box = container.firstElementChild
    expect(box?.className).toContain('bg-blue-50')
  })

  it('renders warning variant', () => {
    const { container } = render(<InfoBox variant="warning">Warning!</InfoBox>)
    const box = container.firstElementChild
    expect(box?.className).toContain('bg-amber-50')
  })

  it('renders success variant', () => {
    const { container } = render(<InfoBox variant="success">Done!</InfoBox>)
    const box = container.firstElementChild
    expect(box?.className).toContain('bg-green-50')
  })

  it('renders danger variant', () => {
    const { container } = render(<InfoBox variant="danger">Error!</InfoBox>)
    const box = container.firstElementChild
    expect(box?.className).toContain('bg-red-50')
  })

  it('applies custom className', () => {
    const { container } = render(<InfoBox className="mt-4">Content</InfoBox>)
    const box = container.firstElementChild
    expect(box?.className).toContain('mt-4')
  })
})
