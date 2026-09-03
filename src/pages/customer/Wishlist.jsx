import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { MapPin, Star, Trash2, Loader2, AlertCircle, Heart, Clock } from 'lucide-react'

export default function Wishlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removing, setRemoving] = useState(null)

  const loadWishlist = () => {
    setLoading(true)
    api.get('/customer/wishlist')
      .then(res => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(err => setError(err.response?.data?.error || 'Unable to load wishlist'))
      .finally(() => setLoading(false))
  }

  useEffect(loadWishlist, [])

  const handleRemove = async (packageId) => {
    setRemoving(packageId)
    try {
      await api.delete(`/customer/wishlist/${packageId}`)
      setItems(prev => prev.filter(w => w.packageId !== packageId))
    } catch (err) {
      // silently fail
    } finally {
      setRemoving(null)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-sky-600" size={32} />
      <span className="ml-3 text-navy-500">Loading wishlist...</span>
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
      <p className="text-red-600 font-medium">{error}</p>
      <button onClick={loadWishlist} className="mt-3 text-sky-600 hover:underline text-sm">Try Again</button>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-2">My Wishlist</h1>
      <p className="text-sm text-navy-500 mb-6">{items.length} saved packages</p>
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <Heart size={48} className="mx-auto mb-3 text-navy-300" />
          <p className="font-medium text-navy-700">Your wishlist is empty.</p>
          <p className="text-sm text-navy-400 mt-1">Click the ❤️ on any package to save it here.</p>
          <Link to="/packages" className="inline-block mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
            Explore Packages
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(w => (
            <div key={w.id || w.packageId} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow group">
              <div className="flex">
                <div className="w-36 h-36 shrink-0 overflow-hidden">
                  <img src={w.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300'} alt={w.title || 'Package'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/packages/${w.slug || w.packageId}`} className="font-bold text-navy-900 hover:text-sky-600 transition-colors line-clamp-1">
                        {w.title || 'Unknown Package'}
                      </Link>
                      <button onClick={() => handleRemove(w.packageId)} disabled={removing === w.packageId}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0 disabled:opacity-50" title="Remove">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {w.destination && (
                      <p className="text-sm text-navy-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} className="shrink-0" /> {[w.destination, w.state].filter(Boolean).join(', ')}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-xs text-navy-500">
                      {w.durationDays > 0 && <span className="flex items-center gap-1"><Clock size={11} /> {w.durationDays}D/{w.durationNights}N</span>}
                      {w.rating > 0 && <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {w.rating}</span>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="font-bold text-sky-600">₹{w.startingPrice?.toLocaleString()}<span className="text-xs text-navy-400 font-normal ml-1">/person</span></span>
                    <Link to={`/packages/${w.slug || w.packageId}`} className="text-xs font-semibold text-sky-600 hover:text-sky-700">View Details →</Link>
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
