import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, ArrowRight } from 'lucide-react'
import api from '../../services/api'

const FALLBACK = [
  { name: 'Rajasthan', slug: 'rajasthan', country: 'India', type: 'domestic', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600', packageCount: 24, tagline: 'Land of Kings' },
  { name: 'Kerala', slug: 'kerala', country: 'India', type: 'domestic', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600', packageCount: 18, tagline: "God's Own Country" },
]

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/destinations').then(res => setDestinations(res.data)).catch(() => setDestinations(FALLBACK))
  }, [])

  const filtered = destinations.filter(d => {
    const matchSearch = d.name?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || d.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-900 to-sky-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920')] bg-cover bg-center opacity-15" />
        <div className="relative container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Explore Destinations</h1>
          <p className="text-navy-200 max-w-2xl mx-auto mb-8">Discover incredible places around the world, from royal Rajasthan to tropical Thailand</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-3.5 text-navy-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-navy-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="section-padding bg-gray-50">
        <div className="container-wide">
          {/* Category chips */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {[
              { value: 'all', label: 'All' },
              { value: 'domestic', label: 'India' },
              { value: 'international', label: 'International' },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f.value ? 'bg-sky-600 text-white' : 'bg-white text-navy-700 hover:bg-navy-50 border'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(d => (
              <Link key={d.slug} to={`/destinations/${d.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs text-gold-400 font-medium uppercase tracking-wider">{d.country}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{d.name}</h3>
                  <p className="text-sm text-white/70">{d.tagline}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-white/60">{d.packages} packages</span>
                    <ArrowRight size={16} className="text-white/60 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <MapPin size={48} className="mx-auto text-navy-300 mb-4" />
              <h3 className="text-xl font-semibold text-navy-700">No destinations found</h3>
              <p className="text-navy-500 mt-2">Try a different search or filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
