'use client'

import { useState, useEffect } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    // Check if user already submitted email
    const submitted = localStorage.getItem('exitIntentSubmitted')
    if (submitted) {
      setHasSubmitted(true)
      return
    }

    // Desktop: detect mouse leaving viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasSubmitted) {
        setIsVisible(true)
      }
    }

    // Add delay before enabling exit intent (don't show immediately)
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasSubmitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'exit_intent_modal',
        }),
      })

      if (response.ok) {
        localStorage.setItem('exitIntentSubmitted', 'true')
        setHasSubmitted(true)
        setShowConfirmation(true)

        // Track event
        fetch(`${API_BASE}/api/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'exit_intent_submission',
            event_data: { email },
          }),
        })

        // Hide modal after showing confirmation
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Error submitting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)

    // Track dismissal
    fetch(`${API_BASE}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'exit_intent_dismissed',
        event_data: {},
      }),
    })

    // Show again after 30 seconds if not submitted
    if (!hasSubmitted) {
      setTimeout(() => {
        setIsVisible(true)
      }, 30000)
    }
  }

  if (!isVisible || hasSubmitted) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {showConfirmation ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-[#E0F2F1] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#0F766E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#111827] mb-2">Thanks!</h3>
            <p className="text-gray-600">
              Check your email in a few minutes. You can always book a call later if you want us to help implement this.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#111827] mb-4 pr-8">
              Before You Go — Want Our AI Funnel Playbook for Free?
            </h2>

            <p className="text-gray-600 mb-6">
              It&apos;s a short, practical PDF with before/after examples, real follow-up sequences and the exact prompt structures we use to fix funnels.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary justify-center disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Yes, Send Me the Playbook
                  </>
                )}
              </button>
            </form>

            <button
              onClick={handleDismiss}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-4"
            >
              No thanks, I&apos;ll figure it out the hard way
            </button>
          </>
        )}
      </div>
    </div>
  )
}
