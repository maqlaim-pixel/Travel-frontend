import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, MapPin } from 'lucide-react'
import api from '../../services/api'

export default function HotelsPage() {
  const [hotels, setHotels] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/hotels').then(res => setHotels(res.data)).catch(() => {})
  }, [])

  const filtered = hotels.filter(h => {
    const matchSearch = h.name?.toLowerCase().includes(search.toLowerCase()) || h.location?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || h.category?.toLowerCase() === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <section className="relative bg-gradient-to-br from-navy-900 to-sky-900 text-white py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Hotels & Stays</h1>
          <p className="text-navy-200 max-w-xl mx-auto mb-8">Premium accommodations handpicked for comfort and experience</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-3.5 text-navy-400" />
            <input type="text" placeholder="Search hotels..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-navy-900 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>
      </section>

      <div className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {['all', 'luxury', 'heritage', 'beach', 'boutique', 'mountain'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f ? 'bg-sky-600 text-white' : 'bg-white text-navy-700 hover:bg-navy-50 border'
                }`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(h => (
              <Link key={h.id || h.slug} to={`/hotels/${h.slug || h.id}`} className="card overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {h.image && <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-navy-900 px-3 py-1 rounded-full text-xs font-medium">{h.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={14} className="text-gold-500 fill-gold-500" />
                    <span className="text-sm font-medium">{h.rating}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1 group-hover:text-sky-600 transition-colors">{h.name}</h3>
                  <p className="text-sm text-navy-500 flex items-center gap-1 mb-3"><MapPin size={12} /> {h.location}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-sky-600">₹{h.pricePerNight?.toLocaleString()}</span>
                    <span className="text-xs text-navy-500">/night</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-navy-500 py-12">No hotels found</p>}
        </div>
      </div>
    </div>
  )
}
