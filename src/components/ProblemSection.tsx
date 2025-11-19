export default function ProblemSection() {
  const painPoints = [
    'You pay for clicks, but very few become real conversations.',
    "You get 'leads', but most never reply after the first message.",
    'Your team is busy, so follow-up is random and inconsistent.',
    "You know AI is powerful, but you don't know where to plug it in.",
    "You've worked with agencies before and got more reports than revenue.",
  ]

  return (
    <section className="py-20 md:py-28 bg-[#F3F4F6]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
            If You&apos;re Already Running Ads or Getting Leads, This Is Probably You
          </h2>
          <p className="text-lg text-gray-600">
            Most businesses don&apos;t need yet another tool. They need their existing marketing to stop leaking. If any of this sounds familiar, you&apos;re not alone:
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            We fix this by treating your business like a funnel, not a collection of disconnected assets — and then we plug AI into the parts that matter most.
          </p>
          <a href="#book-call" className="text-[#0F766E] font-semibold hover:underline inline-flex items-center gap-2">
            Find out what&apos;s leaking in your funnel — book a free call
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
