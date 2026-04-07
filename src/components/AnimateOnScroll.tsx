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
