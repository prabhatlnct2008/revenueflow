export default function WhatWeDoSection() {
  const pillars = [
    {
      number: '1',
      title: 'AI-Redesigned Landing Pages & Offers',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      bullets: [
        'We rebuild or create the pages your traffic actually lands on.',
        'We tighten your messaging with AI-assisted copy that a human edits for clarity and impact.',
        'We design offers your best customers actually want to say yes to.',
        "We simplify forms so they don't scare people away, but still qualify intent.",
      ],
      outcome: 'More visitors become qualified leads.',
    },
    {
      number: '2',
      title: 'Smarter Ads & Targeting Ideas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      bullets: [
        'We generate fresh ad angles and hooks with AI (pain, proof, urgency, logic).',
        "We create multiple ad variants for testing — not just one 'hero' ad.",
        'We suggest structures and audiences that match your funnel and budget.',
      ],
      outcome: 'Better click-through and lower cost per lead/sale.',
    },
    {
      number: '3',
      title: 'AI-Assisted Follow-Up & Sales',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      bullets: [
        'We design AI-written email and WhatsApp sequences tailored to your business.',
        'We give your team simple scripts and templates for calls and chats.',
        "We define when to send what, and to whom, so hot leads don't go cold.",
      ],
      outcome: 'More leads actually become customers.',
    },
    {
      number: '4',
      title: 'AI Automation of Repetitive Work',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bullets: [
        'We identify repetitive tasks your team is stuck doing manually.',
        'We automate first-contact replies, FAQs and simple triage.',
        'We set up reminders, check-ins and simple reports that run on their own.',
      ],
      outcome: 'You and your team spend more time closing, less time chasing.',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
            What We Actually Do <span className="text-gray-500">(In Plain Language)</span>
          </h2>
          <p className="text-lg text-gray-600">
            We don&apos;t just &quot;build a website&quot; or &quot;write some AI copy&quot;. We install a 90-day AI Revenue System on top of the marketing you already have, using a repeatable process that focuses on one thing: more revenue from your existing traffic and leads.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="card border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#E0F2F1] rounded-xl flex items-center justify-center text-[#0F766E]">
                  {pillar.icon}
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#0F766E]">{pillar.number}.</span>
                  <h3 className="text-xl font-bold text-[#111827]">{pillar.title}</h3>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pillar.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm">
                  <span className="font-bold text-[#111827]">Outcome:</span>{' '}
                  <span className="text-gray-600">{pillar.outcome}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#book-call" className="text-[#0F766E] font-semibold hover:underline inline-flex items-center gap-2">
            Want this system in your business? Book your AI Revenue Call
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
