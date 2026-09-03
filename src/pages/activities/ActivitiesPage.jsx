import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, MapPin } from 'lucide-react'
import api from '../../services/api'

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/activities').then(res => setActivities(res.data)).catch(() => {})
  }, [])

  const filtered = activities.filter(a => {
    const matchSearch = a.name?.toLowerCase().includes(search.toLowerCase()) || a.location?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || a.category?.toLowerCase() === filter
    return matchSearch && matchFilter
  })

  return (
    <div>
      <section className="relative bg-gradient-to-br from-navy-900 to-sky-900 text-white py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Adventures & Activities</h1>
          <p className="text-navy-200 max-w-xl mx-auto mb-8">Thrilling experiences curated for the adventurous soul</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-3.5 text-navy-400" />
            <input type="text" placeholder="Search activities..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-navy-900 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>
      </section>

      <div className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {['all', 'adventure', 'water sports', 'trekking', 'wildlife'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f ? 'bg-sky-600 text-white' : 'bg-white text-navy-700 hover:bg-navy-50 border'
                }`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(a => (
              <Link key={a.id || a.slug} to={`/activities/${a.slug || a.id}`} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {a.image && <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                  <span className="absolute top-3 left-3 badge-blue">{a.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-navy-900 mb-1 group-hover:text-sky-600 transition-colors text-sm">{a.name}</h3>
                  <p className="text-xs text-navy-500 flex items-center gap-1 mb-2"><MapPin size={10} /> {a.location} · <Clock size={10} /> {a.duration}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-sky-600">₹{a.price?.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-xs"><Star size={12} className="text-gold-500 fill-gold-500" /> {a.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-navy-500 py-12">No activities found</p>}
        </div>
      </div>
    </div>
  )
}
