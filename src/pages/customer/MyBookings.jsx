import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Calendar, Users, Loader2, AlertCircle, Package } from 'lucide-react'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/customer/bookings')
      .then(res => setBookings(res.data))
      .catch(err => setError(err.response?.data?.error || 'Unable to load bookings'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-sky-600" size={32} />
      <span className="ml-3 text-navy-500">Loading bookings...</span>
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
      <p className="text-red-600 font-medium">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-3 text-sky-600 hover:underline text-sm">Try Again</button>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <Package size={48} className="mx-auto mb-3 text-navy-300" />
          <p className="font-medium text-navy-700">No bookings found.</p>
          <p className="text-sm text-navy-400 mt-1">Start planning your next trip.</p>
          <Link to="/packages" className="inline-block mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
            Browse Packages
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded-xl border p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-navy-400 font-mono">#{b.bookingRef}</p>
                  <h3 className="font-bold text-navy-900 mt-1">{b.packageName}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  b.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                  b.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{b.status}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-navy-600">
                {b.travelDate && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {b.travelDate}{b.endDate ? ` - ${b.endDate}` : ''}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users size={14} /> {b.travelers} traveler{b.travelers > 1 ? 's' : ''}
                </span>
                {b.totalAmount && (
                  <span className="font-bold text-sky-600">₹{Number(b.totalAmount).toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
