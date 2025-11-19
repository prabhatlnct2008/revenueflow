'use client'

import { useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Generate or retrieve session ID
const getSessionId = () => {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem('sessionId')
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('sessionId', sessionId)
  }
  return sessionId
}

// Track an event
export const trackEvent = (eventType: string, eventData: Record<string, unknown> = {}) => {
  const sessionId = getSessionId()

  fetch(`${API_BASE}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: eventType,
      event_data: eventData,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      session_id: sessionId,
    }),
  }).catch(console.error)
}

export default function EventTracker() {
  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      url: window.location.href,
      referrer: document.referrer,
    })

    // Track CTA button clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const button = target.closest('a, button')

      if (button) {
        const text = button.textContent?.trim() || ''
        const href = button.getAttribute('href') || ''

        // Track specific CTA clicks
        if (
          text.includes('Book') ||
          text.includes('Schedule') ||
          text.includes('Get Started') ||
          text.includes('Calculate') ||
          text.includes('Send Me')
        ) {
          trackEvent('cta_click', {
            text,
            href,
            element: button.tagName.toLowerCase(),
          })
        }
      }
    }

    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent

        // Track at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackEvent('scroll_depth', { percent: scrollPercent })
        }
      }
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
