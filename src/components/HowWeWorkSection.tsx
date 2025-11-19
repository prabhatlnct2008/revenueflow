export default function HowWeWorkSection() {
  const steps = [
    {
      number: '1',
      title: 'Free AI Revenue Call (30 mins)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      description: "We look at your current funnel together (website, ads, follow-up). You tell us your numbers and goals. We give you 2–3 concrete ideas on the spot, even if you don't work with us.",
    },
    {
      number: '2',
      title: 'AI Revenue Blueprint',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: "Within a few days, you receive a simple, no-fluff document: Where your funnel is leaking, which AI-powered fixes we recommend, rough projections of what those fixes could do, and a clear project scope and fixed price.",
    },
    {
      number: '3',
      title: 'Implementation Sprint (2–4 weeks)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: "If you're in, we implement: New or updated landing pages, ad angles and creatives, follow-up sequences (email/WhatsApp), basic automations tied into your tools. You get weekly updates and a clear 'before vs after' at the end of the sprint.",
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            How We Work Together <span className="text-[#0F766E]">(No Jargon)</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#0F766E]">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-[#E0F2F1] mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <span className="text-sm font-semibold text-[#0F766E]">Step {step.number}</span>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="#book-call" className="btn-primary">
            Start with the free call — decide only after you see the plan
          </a>
        </div>
      </div>
    </section>
  )
}
