'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Do you just use ChatGPT and charge me on top?',
      answer: 'We use AI tools, yes — but the value is in how we design your funnel, offers, follow-up and automations based on your numbers and customers. Tools are cheap. Good systems are not.',
    },
    {
      question: 'Do I need to change my entire tech stack?',
      answer: "No. We start with what you already use (website, email platform, WhatsApp, CRM if any). If we recommend a new tool, it will be simple, affordable and clearly justified.",
    },
    {
      question: 'How long before I see results?',
      answer: 'Most clients start seeing changes in lead quality and response rates within 2–4 weeks of implementation, depending on traffic volume and how quickly we can launch your funnel changes.',
    },
    {
      question: "What if this doesn't work for me?",
      answer: "On the AI Revenue Call and in the AI Revenue Blueprint, we'll be honest about what's realistic. If we don't think we can make a meaningful difference, we won't recommend a project.",
    },
    {
      question: 'Are you a long-term agency?',
      answer: "We work more like a special forces team: come in, fix the critical parts, set up systems and either stay on for light optimisation or hand over cleanly to your team.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#F3F4F6]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Questions You Might Have
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#111827]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Still unsure?{' '}
            <a href="#book-call" className="text-[#0F766E] font-semibold hover:underline">
              Ask about your specific situation on WhatsApp or book a free call
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
