import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import { BookMarked, Heart, Star, MessageCircle, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/customer/dashboard')
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.error || 'Unable to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-sky-600" size={32} />
      <span className="ml-3 text-navy-500">Loading your dashboard...</span>
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
      <p className="text-red-600 font-medium">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-3 text-sky-600 hover:underline text-sm">Try Again</button>
    </div>
  )

  const stats = [
    { icon: BookMarked, label: 'Bookings', value: data?.bookingCount ?? 0, color: 'bg-sky-100 text-sky-600' },
    { icon: MessageCircle, label: 'Enquiries', value: data?.enquiryCount ?? 0, color: 'bg-purple-100 text-purple-600' },
    { icon: Heart, label: 'Wishlist', value: data?.wishlistCount ?? 0, color: 'bg-red-100 text-red-500' },
    { icon: Star, label: 'Reviews', value: data?.reviewCount ?? 0, color: 'bg-amber-100 text-amber-600' },
  ]

  const recentBookings = data?.recentBookings ?? []

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-6">
        Welcome back, {data?.name || user?.name}!
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center`}>
              <s.icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{s.value}</p>
              <p className="text-sm text-navy-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="text-lg font-bold text-navy-900 mb-4">Recent Bookings</h2>
        {recentBookings.length === 0 ? (
          <div className="text-center py-8 text-navy-400">
            <BookMarked size={36} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">No bookings yet.</p>
            <p className="text-sm mt-1">Start planning your next trip!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentBookings.slice(0, 5).map(b => (
              <div key={b.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold text-navy-900">{b.packageName}</p>
                  <p className="text-sm text-navy-500">
                    {b.travelDate || 'Date TBD'} {b.endDate ? `- ${b.endDate}` : ''}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  b.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  b.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/packages" className="btn-primary inline-flex items-center gap-2">
        Browse Packages <ArrowRight size={16} />
      </Link>
    </div>
  )
}
