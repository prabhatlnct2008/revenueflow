export default function CaseStudiesSection() {
  const caseStudies = [
    {
      tag: 'Dental Clinic, Bangalore',
      title: 'Example Scenario: Local Dental Clinic — More Appointments from the Same Ad Spend',
      before: [
        '₹35,000/month on Facebook & Instagram ads',
        '~120 leads/month',
        'Only 10–12 new patients actually showing up',
      ],
      implemented: [
        "New landing page focused on a single core offer: 'New Patient Check-up + Cleaning Package'",
        'Removed 4 unnecessary form fields and added 1 smart qualifier',
        "AI-written WhatsApp follow-up: Instant 'thanks + booking link' message, Reminder at 24 hours, 'Last chance this week' nudge before the weekend",
      ],
      outcome: [
        'Lead → appointment: 8% → 22%',
        'Additional 24+ patients per month',
        'Extra revenue ≈ ₹72,000/month (₹3,000 avg ticket)',
      ],
      investment: '~₹20,000 implementation + light monthly support',
    },
    {
      tag: 'Fitness Studio, Delhi NCR',
      title: 'Example Scenario: Fitness Studio — Lower Cost per Member, More Sign-Ups',
      before: [
        '₹40,000/month on ads to a generic homepage',
        'Inconsistent challenge sign-ups',
        'Manual follow-up when someone remembered',
      ],
      implemented: [
        "Focused funnel for one offer: '21-Day Transformation Challenge'",
        'AI-built landing page with clear transformation, proof and FAQs',
        '5 high-converting ad creatives with different angles',
        "Email + WhatsApp follow-up for people who enquired but didn't pay",
        'Urgency messages tied to batch start dates',
      ],
      outcome: [
        'Cost per paying challenge member: ₹1,800 → ₹1,050',
        'Monthly challenge sign-ups: 22 → 35',
        'Extra revenue ≈ ₹78,000+/month',
      ],
      investment: '~₹25,000–₹30,000',
    },
    {
      tag: 'B2B Consultant',
      title: 'Example Scenario: B2B Consultant — More Discovery Calls from Existing Traffic',
      before: [
        'Traffic from LinkedIn + content going to a generic Services page',
        '3–4 booked discovery calls per month',
      ],
      implemented: [
        'New flagship offer landing page with a clear outcome and proof',
        "Short 'mini-diagnosis' form to pre-qualify serious buyers",
        "4-email AI-generated nurture sequence adapted to the founder's voice",
        'Calendar + reminder automation to reduce no-shows',
      ],
      outcome: [
        'Visitor → booked call: 0.9% → 3.5%',
        'Discovery calls per month: 3–4 → 8–10',
        'Deals per quarter: 3 → 9 (depending on close rate)',
      ],
      investment: '~$500–$750 (₹40,000–₹60,000 equivalent)',
    },
  ]

  return (
    <section id="results" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
            What This Looks Like in Real Businesses
          </h2>
          <p className="text-lg text-gray-600">
            These example scenarios show the kind of impact we aim for with each client. The exact numbers will vary in your business, but the pattern is the same: fix the funnel, plug in AI, and let the system run.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div key={study.tag} className="card border border-gray-100 flex flex-col">
              <div className="bg-[#0F766E] text-white px-4 py-3 -mx-6 -mt-6 mb-6 rounded-t-xl">
                <span className="font-semibold">{study.tag}</span>
              </div>

              <h3 className="text-lg font-bold text-[#111827] mb-4">{study.title}</h3>

              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">BEFORE:</h4>
                <ul className="space-y-1">
                  {study.before.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">WHAT WE IMPLEMENTED:</h4>
                <ul className="space-y-1">
                  {study.implemented.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#0F766E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 bg-[#E0F2F1] rounded-lg p-4">
                <h4 className="text-sm font-bold text-[#0F766E] mb-2">90-DAY MODELED OUTCOME:</h4>
                <ul className="space-y-1">
                  {study.outcome.map((item, index) => (
                    <li key={index} className="text-sm text-[#111827] flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#0F766E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Estimated project investment:</span> {study.investment}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-[#E0F2F1] rounded-xl p-8">
          <p className="text-lg font-semibold text-[#111827] mb-2">
            See what this might look like with your numbers — book your free AI Revenue Call
          </p>
          <p className="text-gray-600 mb-6">
            On the call, we&apos;ll rough-calc what improving your funnel by even a few percentage points could mean per month.
          </p>
          <a href="#book-call" className="btn-primary">
            Book Your Free Call
          </a>
        </div>
      </div>
    </section>
  )
}
