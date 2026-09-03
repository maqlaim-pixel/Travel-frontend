import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Heart, Eye, Users, Star } from 'lucide-react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const BADGE_STYLES = {
  Popular: 'bg-emerald-500',
  'Best Seller': 'bg-amber-500',
  Trending: 'bg-blue-500',
  Adventure: 'bg-orange-500',
  Luxury: 'bg-purple-500',
  Spiritual: 'bg-rose-500',
  Budget: 'bg-teal-500',
  Weekend: 'bg-indigo-500',
  Family: 'bg-pink-500',
  Honeymoon: 'bg-red-400',
  Beach: 'bg-cyan-500',
}

function getBadge(pkg) {
  if (pkg.badge) return pkg.badge
  if (pkg.featured) return 'Popular'
  const price = pkg.startingPrice || 0
  if (price < 10000) return 'Budget'
  if (pkg.tags?.toLowerCase().includes('luxury')) return 'Luxury'
  if (pkg.tags?.toLowerCase().includes('adventure')) return 'Adventure'
  if (pkg.tags?.toLowerCase().includes('honeymoon')) return 'Honeymoon'
  if (pkg.tags?.toLowerCase().includes('beach')) return 'Beach'
  if (pkg.tags?.toLowerCase().includes('spiritual')) return 'Spiritual'
  if (pkg.category === 'international') return 'Trending'
  return null
}

export default function PackageCard({ pkg }) {
  const { user } = useAuth()
  const [wishlisted, setWishlisted] = useState(false)
  const [addingWish, setAddingWish] = useState(false)

  const formatPrice = (p) => p ? `₹${Number(p).toLocaleString('en-IN')}` : ''
  const fallbackImg = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600'
  const badge = getBadge(pkg)

  // Parse tags into array
  const tags = pkg.tags ? pkg.tags.split(',').map(t => t.trim()).filter(Boolean) : []

  // Build cities string from state + destination
  const cities = [pkg.destination, pkg.state, pkg.country].filter(Boolean).join(' • ')

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { alert('Please login to add to wishlist'); return }
    if (wishlisted || addingWish) return
    setAddingWish(true)
    try {
      await api.post('/customer/wishlist', { packageId: pkg.id })
      setWishlisted(true)
    } catch (err) {
      // If already wishlisted, show as added
      if (err.response?.status === 409) setWishlisted(true)
      else if (err.response?.status === 401) alert('Please login to add to wishlist')
      else if (err.response?.status === 500) alert('Server error — please restart the backend and try again')
      else console.error('Wishlist error:', err)
    }
    setAddingWish(false)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={pkg.coverImage || pkg.image || fallbackImg}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 ${BADGE_STYLES[badge] || 'bg-sky-600'} text-white text-xs font-semibold rounded-lg shadow-lg`}>
            {badge}
          </span>
        )}

        {/* Heart / Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
            wishlisted
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart size={16} className={wishlisted ? 'fill-white' : ''} />
        </button>

        {/* Duration badge at bottom */}
        {pkg.durationDays > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
            <Clock size={12} />
            {pkg.durationDays} Days / {pkg.durationNights} Nights
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-navy-900 text-base mb-1 line-clamp-1 group-hover:text-sky-600 transition-colors">
          {pkg.title}
        </h3>

        {/* Cities / Location */}
        {cities && (
          <p className="text-sm text-navy-500 flex items-center gap-1 mb-2">
            <MapPin size={12} className="shrink-0 text-sky-400" />
            <span className="line-clamp-1">{cities}</span>
          </p>
        )}

        {/* Rating */}
        {pkg.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-navy-800">{pkg.rating}</span>
            <span className="text-xs text-navy-400">({pkg.reviewCount || 0} reviews)</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-navy-600 text-xs rounded-md font-medium flex items-center gap-1">
                {getTagIcon(tag)} {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-navy-400 text-xs rounded-md">+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-sky-600">{formatPrice(pkg.startingPrice)}</span>
            <span className="text-xs text-navy-400 ml-1">/person</span>
          </div>
          <Link
            to={`/packages/${pkg.slug || pkg.id}`}
            className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
          >
            <Eye size={13} /> View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

function getTagIcon(tag) {
  const t = tag.toLowerCase()
  if (t.includes('heritage') || t.includes('royal')) return '🏛️'
  if (t.includes('family')) return '👨‍👩‍👧'
  if (t.includes('couple') || t.includes('honeymoon')) return '💑'
  if (t.includes('private')) return '🚗'
  if (t.includes('beach')) return '🏖️'
  if (t.includes('nature') || t.includes('wildlife')) return '🌿'
  if (t.includes('adventure') || t.includes('trek')) return '⛰️'
  if (t.includes('spiritual') || t.includes('temple')) return '🙏'
  if (t.includes('luxury')) return '✨'
  if (t.includes('budget')) return '💰'
  if (t.includes('transfer')) return '✈️'
  if (t.includes('group')) return '👥'
  return '🏷️'
}
