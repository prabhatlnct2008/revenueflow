'use client'

import { useState } from 'react'

export default function LeadMagnetSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
  })

  const businessTypes = [
    'Clinic',
    'Fitness',
    'Coaching',
    'Agency',
    'Other',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Lead magnet form submitted:', formData)
    alert('Thank you! Check your email for the AI Funnel Playbook.')
  }

  return (
    <section id="lead-magnet" className="py-16 md:py-24 bg-[#111827]">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Not Ready to Talk Yet? Get Our AI Funnel Playbook.
          </h2>
          <p className="text-lg text-gray-300">
            Drop your email and we&apos;ll send you: a 3-page AI Funnel Playbook with before/after examples, 3 real email/WhatsApp sequences you can adapt, and the prompt frameworks we use to improve landing pages and ads.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                >
                  <option value="">Select type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full btn-primary justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Me the AI Funnel Playbook
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              1–2 practical emails per week. No spam, no &quot;AI news&quot;, just things you can test.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
