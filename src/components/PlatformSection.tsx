export default function PlatformSection() {
  const platforms = [
    {
      title: 'AI Website Creator',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      description: 'Spin up high-converting websites or landing pages that are structured for leads, not just looks. We start from your current site (or a blank slate) and use AI to generate layouts and copy that we then refine for your offer and audience.',
      bullets: [
        'Launch focused campaign pages fast',
        'Test new offers without waiting on devs',
      ],
    },
    {
      title: 'On-Page AI Editor',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: "Once your pages are live, you can click on any text section, headline or block and ask AI to improve it. Change tone, headline or offers without touching code — we'll set up the editor so you can keep iterating without needing us for every small tweak.",
      bullets: [
        'Edit copy directly on your site',
        "Ask AI: 'Make this clearer / more urgent / more friendly'",
      ],
    },
    {
      title: 'AI Digital Assistant (WhatsApp + Email)',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description: "A simple assistant that checks in with your leads and clients via WhatsApp and email. Reminders, follow-ups and 'just checking in' messages go out without your team having to remember.",
      bullets: [
        'Automatic first-contact replies',
        'Appointment or trial reminders',
        'Light-touch reactivation nudges',
      ],
      badge: 'Free starter included',
    },
    {
      title: 'AI Ad Creator & Optimizer',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      description: 'Generate and iterate Meta ad copy and creative ideas that are aligned to your funnel. We use this to create multiple ad variants and keep improving them based on performance.',
      bullets: [
        'Multiple ad angles (pain, proof, urgency)',
        'Faster creative testing without burning your team out',
      ],
    },
  ]

  return (
    <section id="platform" className="py-20 md:py-28 bg-[#F3F4F6]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
            The AI Growth Platform You Get Access To
          </h2>
          <p className="text-lg text-gray-600">
            Under the hood, our 90-day system runs on a set of tools we&apos;ve built and configured for service businesses. You don&apos;t pay extra for software — we use these to deliver results and, when it makes sense, we give you access too.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {platforms.map((platform) => (
            <div key={platform.title} className="card border border-gray-100 relative">
              {platform.badge && (
                <span className="absolute top-4 right-4 bg-[#E0F2F1] text-[#0F766E] text-xs font-semibold px-3 py-1 rounded-full">
                  {platform.badge}
                </span>
              )}

              <div className="flex-shrink-0 w-12 h-12 bg-[#E0F2F1] rounded-xl flex items-center justify-center text-[#0F766E] mb-4">
                {platform.icon}
              </div>

              <h3 className="text-xl font-bold text-[#111827] mb-3">{platform.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{platform.description}</p>

              <ul className="space-y-2">
                {platform.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[#0F766E] rounded-full"></span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 text-center">
          <p className="text-gray-600">
            We don&apos;t just hand you tools and disappear. We use this platform to implement your AI Revenue System — and teach your team how to get ongoing value from it.
          </p>
        </div>
      </div>
    </section>
  )
}
