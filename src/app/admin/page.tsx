'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Stats {
  total_leads: number
  leads_today: number
  total_events: number
  leads_by_source: Record<string, number>
  events_by_type: Record<string, number>
}

interface Lead {
  id: number
  name: string
  email: string
  source: string
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchData(token)
  }, [router])

  const fetchData = async (token: string) => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE}/api/admin/leads?limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      if (statsRes.status === 401 || leadsRes.status === 401) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
        return
      }

      const statsData = await statsRes.json()
      const leadsData = await leadsRes.json()

      setStats(statsData)
      setRecentLeads(leadsData.slice(0, 10))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">AI Revenue Studio - Admin</h1>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-teal-400">Dashboard</Link>
            <Link href="/admin/leads" className="hover:text-teal-400">Leads</Link>
            <Link href="/admin/events" className="hover:text-teal-400">Events</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Leads</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_leads || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Leads Today</h3>
            <p className="text-3xl font-bold text-[#0F766E]">{stats?.leads_today || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Events</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.total_events || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats && stats.total_events > 0
                ? ((stats.total_leads / stats.total_events) * 100).toFixed(1)
                : 0}%
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Leads by Source */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads by Source</h3>
            <div className="space-y-3">
              {stats?.leads_by_source && Object.entries(stats.leads_by_source).map(([source, count]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{source.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
              {(!stats?.leads_by_source || Object.keys(stats.leads_by_source).length === 0) && (
                <p className="text-gray-500">No leads yet</p>
              )}
            </div>
          </div>

          {/* Events by Type */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Events by Type</h3>
            <div className="space-y-3">
              {stats?.events_by_type && Object.entries(stats.events_by_type).map(([eventType, count]) => (
                <div key={eventType} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">{eventType.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-gray-900">{count}</span>
                </div>
              ))}
              {(!stats?.events_by_type || Object.keys(stats.events_by_type).length === 0) && (
                <p className="text-gray-500">No events yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            <Link href="/admin/leads" className="text-[#0F766E] hover:underline text-sm">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{lead.name || '-'}</td>
                    <td className="py-3 px-4">{lead.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.source === 'book_call' ? 'bg-teal-100 text-teal-700' :
                        lead.source === 'lead_magnet' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {lead.source.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {recentLeads.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">No leads yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
