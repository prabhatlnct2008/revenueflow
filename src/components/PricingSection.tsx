export default function PricingSection() {
  const plans = [
    {
      badge: 'Most Popular',
      badgeColor: 'bg-[#0F766E] text-white',
      title: 'Funnel Fix – Single Offer',
      description: 'Perfect if you have one core service or campaign and know your funnel is leaking.',
      includes: [
        'AI funnel audit (page + ads + follow-up)',
        '1 high-converting landing page (copy + structure)',
        '3–5 ad variations aligned with your offer',
        '1 main follow-up sequence (email or WhatsApp)',
        'Basic setup of your Digital Assistant for first-contact + simple reminder flow',
      ],
      price: 'From ₹20,000',
      buttonText: 'Get Started',
      buttonStyle: 'btn-primary',
      highlighted: true,
    },
    {
      title: 'Growth & Automation Bundle',
      description: 'For businesses with multiple channels and more leads who want deeper automation and nurturing.',
      includes: [
        'Everything in Funnel Fix',
        'Additional nurture sequence (email + WhatsApp)',
        '1–2 additional automations (e.g., FAQ bot, lead tagging, reactivation)',
        '4–6 weeks of optimisation and tweaks based on early data',
      ],
      price: '₹40,000–₹60,000',
      buttonText: 'Book a Call',
      buttonStyle: 'btn-dark',
      highlighted: false,
    },
    {
      badge: 'Low-Risk Starter',
      badgeColor: 'bg-[#111827] text-white',
      title: 'AI Funnel Checkup',
      description: "Not ready for a full project yet? Start small. Get a professional AI review of your funnel for less than a day's ad spend.",
      includes: [
        'Short intake form review',
        'Review of your current website/landing page, ads and basic follow-up',
        '1-page action plan (PDF) with the top 3 fixes we\'d make',
        '5–10 minute Loom-style video walkthrough of your funnel',
        'Platform integration recommendations',
      ],
      price: 'Only ₹999',
      priceNote: 'Your ₹999 is fully credited towards any project you do with us within 60 days.',
      buttonText: 'Start with Checkup',
      buttonStyle: 'btn-dark',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
            Pricing & Ways to Start
          </h2>
          <p className="text-lg text-gray-600">
            We keep pricing straightforward so you can decide quickly. Start with a full project or a small paid checkup, and move up only if it makes sense.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`card border-2 flex flex-col ${
                plan.highlighted ? 'border-[#0F766E]' : 'border-gray-100'
              }`}
            >
              {plan.badge && (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 self-start ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
              )}

              <h3 className="text-xl font-bold text-[#111827] mb-2">{plan.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

              {plan.priceNote && (
                <div className="bg-[#E0F2F1] rounded-lg p-3 mb-4 text-sm text-[#0F766E]">
                  {plan.priceNote}
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">INCLUDES:</h4>
                <ul className="space-y-2">
                  {plan.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#0F766E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <p className="text-2xl font-bold text-[#111827] mb-4">{plan.price}</p>
                <a href="#book-call" className={`w-full ${plan.buttonStyle} justify-center`}>
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
