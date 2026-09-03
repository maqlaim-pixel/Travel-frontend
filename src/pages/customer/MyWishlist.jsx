import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, MapPin, Clock, Star, Loader2, Package } from 'lucide-react'
import api from '../../services/api'

export default function MyWishlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/customer/wishlist')
      .then(res => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const removeItem = async (packageId) => {
    if (!confirm('Remove this package from your wishlist?')) return
    try {
      await api.delete(`/customer/wishlist/${packageId}`)
      setItems(prev => prev.filter(i => i.packageId !== packageId))
    } catch (err) {
      console.error('Remove failed:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={32} className="animate-spin text-sky-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">My Wishlist</h1>
          <p className="text-sm text-navy-500 mt-1">{items.length} saved packages</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <Heart size={48} className="mx-auto text-navy-300 mb-4" />
          <h3 className="text-lg font-semibold text-navy-700 mb-2">No packages saved yet</h3>
          <p className="text-navy-500 mb-4">Browse packages and click the ❤️ heart icon to save your favorites</p>
          <Link to="/packages" className="inline-block bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-sky-700 transition-colors">
            Browse Packages
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="flex">
                {/* Image */}
                <div className="w-40 h-40 shrink-0 overflow-hidden">
                  <img
                    src={item.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/packages/${item.slug}`} className="font-bold text-navy-900 hover:text-sky-600 transition-colors line-clamp-1">
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.packageId)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-sm text-navy-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} className="shrink-0" />
                      {[item.destination, item.state].filter(Boolean).join(', ')}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-navy-500">
                      {item.durationDays > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {item.durationDays}D/{item.durationNights}N
                        </span>
                      )}
                      {item.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={11} className="text-amber-400 fill-amber-400" /> {item.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-bold text-sky-600">₹{item.startingPrice?.toLocaleString()}</span>
                      <span className="text-xs text-navy-400 ml-1">/person</span>
                    </div>
                    <Link to={`/packages/${item.slug}`} className="text-xs font-semibold text-sky-600 hover:text-sky-700">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
