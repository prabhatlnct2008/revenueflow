export default function IsThisForMeSection() {
  const forYou = [
    'Each new client is worth at least ₹10,000–₹15,000 to your business.',
    "You're already running ads or getting inbound leads.",
    "You feel you're leaving money on the table in follow-up and funnel leaks.",
    'You want a partner who implements, not just sends reports.',
  ]

  const notForYou = [
    "You're looking for the cheapest possible service or free experiments.",
    "You don't have any traffic or leads coming in yet.",
    'You want "AI experiments" without clear revenue goals.',
  ]

  return (
    <section className="py-16 md:py-24 bg-[#F3F4F6]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            Who This Is <span className="text-[#0F766E]">(and Isn&apos;t)</span> For
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* For You */}
          <div className="bg-[#E0F2F1] rounded-xl p-6 border-2 border-[#0F766E]/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✅</span>
              <h3 className="text-xl font-bold text-[#111827]">This is for you if:</h3>
            </div>
            <ul className="space-y-3">
              {forYou.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0F766E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For You */}
          <div className="bg-red-50 rounded-xl p-6 border-2 border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">❌</span>
              <h3 className="text-xl font-bold text-[#111827]">This is not for you if:</h3>
            </div>
            <ul className="space-y-3">
              {notForYou.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="#book-call" className="text-[#0F766E] font-semibold hover:underline inline-flex items-center gap-2">
            If that sounds like you, book your AI Revenue Call and let&apos;s look at your funnel together
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
