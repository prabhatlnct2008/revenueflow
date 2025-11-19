'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Lead {
  id: number
  name: string
  email: string
  phone: string
  website: string
  goal: string
  business_type: string
  source: string
  created_at: string
}

export default function AdminLeads() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchLeads(token)
  }, [router])

  const fetchLeads = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      setLeads(data)
    } catch (error) {
      console.error('Error fetching leads:', error)
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
            <Link href="/admin" className="hover:text-teal-400">Dashboard</Link>
            <Link href="/admin/leads" className="text-teal-400">Leads</Link>
            <Link href="/admin/events" className="hover:text-teal-400">Events</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Leads ({leads.length})</h2>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Website</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Goal</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-500">{lead.id}</td>
                    <td className="py-3 px-4">{lead.name || '-'}</td>
                    <td className="py-3 px-4">{lead.email}</td>
                    <td className="py-3 px-4">{lead.phone || '-'}</td>
                    <td className="py-3 px-4 text-sm">
                      {lead.website ? (
                        <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {lead.website.length > 30 ? lead.website.substring(0, 30) + '...' : lead.website}
                        </a>
                      ) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm">{lead.goal || lead.business_type || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.source === 'book_call' ? 'bg-teal-100 text-teal-700' :
                        lead.source === 'lead_magnet' ? 'bg-blue-100 text-blue-700' :
                        lead.source === 'exit_intent_modal' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {lead.source.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">No leads yet</td>
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
