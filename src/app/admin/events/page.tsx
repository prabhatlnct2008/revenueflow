'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface Event {
  id: number
  event_type: string
  event_data: Record<string, unknown>
  page: string
  session_id: string
  created_at: string
}

export default function AdminEvents() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchEvents(token)
  }, [router])

  const fetchEvents = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/events`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
        return
      }

      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
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
            <Link href="/admin/leads" className="hover:text-teal-400">Leads</Link>
            <Link href="/admin/events" className="text-teal-400">Events</Link>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Tracking ({events.length})</h2>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Event Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Event Data</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Page</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Session</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-500">{event.id}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.event_type.includes('click') ? 'bg-blue-100 text-blue-700' :
                        event.event_type.includes('submit') ? 'bg-green-100 text-green-700' :
                        event.event_type.includes('view') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {event.event_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {Object.keys(event.event_data).length > 0
                        ? JSON.stringify(event.event_data).substring(0, 50) + '...'
                        : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm">{event.page || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {event.session_id ? event.session_id.substring(0, 8) + '...' : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(event.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">No events yet</td>
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
