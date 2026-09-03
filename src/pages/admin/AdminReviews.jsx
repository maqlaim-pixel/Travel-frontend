import { useState, useEffect } from 'react'
import { Search, Star, Trash2, MessageSquare } from 'lucide-react'
import api from '../../services/api'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/data/reviews')
      .then(res => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = reviews.filter(r =>
    r.userName?.toLowerCase().includes(search.toLowerCase()) ||
    r.packageName?.toLowerCase().includes(search.toLowerCase()) ||
    r.comment?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return
    try {
      await api.delete(`/admin/data/reviews/${id}`)
      setReviews(prev => prev.filter(r => r.id !== id))
    } catch { alert('Failed to delete review') }
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Reviews</h1>
          <p className="text-sm text-navy-500">{reviews.length} review{reviews.length !== 1 ? 's' : ''} · {avgRating} avg rating</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-navy-900">{reviews.length}</p>
          <p className="text-sm text-navy-500">Total Reviews</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star size={18} className="text-gold-500 fill-gold-500" />
            <p className="text-2xl font-bold text-navy-900">{avgRating}</p>
          </div>
          <p className="text-sm text-navy-500">Average Rating</p>
        </div>
        <div className="bg-white rounded-xl border p-4 text-center">
          <p className="text-2xl font-bold text-navy-900">{reviews.filter(r => r.rating === 5).length}</p>
          <p className="text-sm text-navy-500">5-Star Reviews</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-2.5 text-navy-400" />
            <input type="text" placeholder="Search reviews..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-navy-500 text-sm">Loading reviews...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-3 text-navy-200" />
            <p className="text-navy-500 font-medium">No reviews yet</p>
            <p className="text-sm text-navy-400 mt-1">Reviews will appear here when customers submit them.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Package</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Rating</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Comment</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Date</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-navy-900">{r.userName || 'Anonymous'}</p>
                      <p className="text-xs text-navy-500">{r.userEmail}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-navy-600">{r.packageName || '—'}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: r.rating || 0 }).map((_, i) => (
                          <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                        ))}
                        {Array.from({ length: 5 - (r.rating || 0) }).map((_, i) => (
                          <Star key={`e-${i}`} size={12} className="text-navy-200" />
                        ))}
                      </div>
                      <span className="text-xs text-navy-500">{r.rating}/5</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-navy-600 max-w-xs truncate">{r.comment}</td>
                    <td className="px-5 py-4 text-sm text-navy-400">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button onClick={() => handleDelete(r.id)} className="p-1.5 text-navy-400 hover:text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
