'use client'

import { useState } from 'react'

export default function QuickWinEstimator() {
  const [revenue, setRevenue] = useState('')
  const [leads, setLeads] = useState('')
  const [conversionRate, setConversionRate] = useState('')
  const [result, setResult] = useState<{ extraCustomers: number; extraRevenue: number } | null>(null)

  const calculateUpside = () => {
    const revenueNum = parseFloat(revenue)
    const leadsNum = parseFloat(leads)
    const conversionNum = parseFloat(conversionRate)

    if (isNaN(revenueNum) || isNaN(leadsNum) || isNaN(conversionNum)) {
      return
    }

    const currentCustomers = (leadsNum * conversionNum) / 100
    const improvedConversion = conversionNum + 5
    const newCustomers = (leadsNum * improvedConversion) / 100
    const extraCustomers = Math.round(newCustomers - currentCustomers)
    const extraRevenue = Math.round(extraCustomers * revenueNum)

    setResult({ extraCustomers, extraRevenue })
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#E0F2F1] to-[#F3F4F6]">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <svg className="w-5 h-5 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-[#111827]">Quick Win Estimator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            What Could Fixing Your Funnel Be Worth?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No maths degree needed. Enter rough numbers — we&apos;ll show a simple modeled upside if your funnel improves even a little.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Average revenue per new customer (₹)
                </label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g., 15000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Approx. new leads per month
                </label>
                <input
                  type="number"
                  value={leads}
                  onChange={(e) => setLeads(e.target.value)}
                  placeholder="e.g., 120"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111827] mb-2">
                  Approx. % of leads who currently become customers
                </label>
                <input
                  type="number"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(e.target.value)}
                  placeholder="e.g., 8"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0F766E] focus:border-transparent outline-none"
                />
              </div>

              <button
                onClick={calculateUpside}
                className="w-full btn-primary justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate My Potential Upside
              </button>
            </div>

            {result && (
              <div className="mt-6 p-4 bg-[#E0F2F1] rounded-lg">
                <p className="text-[#111827]">
                  If we improve your lead→customer rate from <strong>{conversionRate}%</strong> to{' '}
                  <strong>{parseFloat(conversionRate) + 5}%</strong>, that&apos;s roughly{' '}
                  <strong>{result.extraCustomers}</strong> extra customers/month — or about{' '}
                  <strong>₹{result.extraRevenue.toLocaleString()}/month</strong> in added revenue.
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="text-center mt-6">
              <a href="#book-call" className="text-[#0F766E] font-semibold hover:underline inline-flex items-center gap-2">
                Want help actually getting there? Book your free AI Revenue Call
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
