'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Activates scroll-triggered animations for elements with .animate-on-scroll class.
 * Re-scans on route changes to catch dynamically loaded content.
 */
export function AnimateOnScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Respect OS-level reduced-motion preference (WCAG 2.3.3, vestibular disorders).
    // Mark all reveal elements visible immediately instead of animating in.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document
        .querySelectorAll('.animate-on-scroll:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return null
}
