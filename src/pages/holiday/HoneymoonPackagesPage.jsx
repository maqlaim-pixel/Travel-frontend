import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, SlidersHorizontal, Grid3X3, List } from 'lucide-react'
import api from '../../services/api'
import PackageCard from '../../components/common/PackageCard'
import ComingSoon from '../../components/common/ComingSoon'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: '0-15000', label: 'Under ₹15,000' },
  { value: '15000-30000', label: '₹15,000 - ₹30,000' },
  { value: '30000-50000', label: '₹30,000 - ₹50,000' },
  { value: '50000+', label: '₹50,000+' },
]

const HONEymoon_CATEGORIES = [
  { label: 'Domestic', value: 'domestic' },
  { label: 'International', value: 'international' },
  { label: 'Beach', value: 'beach' },
  { label: 'Hill Station', value: 'hill' },
  { label: 'Luxury', value: 'luxury' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Budget', value: 'budget' },
]

export default function HoneymoonPackagesPage() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [priceFilter, setPriceFilter] = useState('all')
  const [viewMode, setViewMode] = useState('card')
  const [selectedTypes, setSelectedTypes] = useState([])

  useEffect(() => {
    setLoading(true)
    api.get('/packages')
      .then(res => {
        const all = res.data || []
        const honeymoon = all.filter(p => {
          const s = [p.title, p.destination, p.state, p.country, p.tags, p.category].filter(Boolean).join(' ').toLowerCase()
          return s.includes('honeymoon') || s.includes('romantic') || s.includes('couple') ||
            ['maldives','bali','paris','santorini','switzerland','dubai','thailand','singapore','japan','europe','mauritius','seychelles',
             'goa','ooty','coorg','manali','shimla','munnar','kashmir','andaman','rishikesh','ladakh'].some(k => s.includes(k))
        })
        setPackages(honeymoon)
      })
      .catch(() => setPackages([]))
      .finally(() => setLoading(false))
  }, [])

  const getBadge = (pkg) => {
    if (pkg.badge) return pkg.badge
    const s = [pkg.tags, pkg.title, pkg.destination, pkg.state, pkg.country].filter(Boolean).join(' ').toLowerCase()
    if (s.includes('luxury') || (pkg.startingPrice && parseInt(pkg.startingPrice) >= 50000)) return 'Luxury'
    if (s.includes('adventure')) return 'Adventure'
    if (s.includes('beach')) return 'Beach'
    if (s.includes('budget') || (pkg.startingPrice && parseInt(pkg.startingPrice) <= 15000)) return 'Budget'
    if (s.includes('hill') || s.includes('mountain')) return 'Hill Station'
    if (s.includes('honeymoon') || s.includes('romantic')) return 'Honeymoon'
    if (pkg.category === 'international') return 'International'
    return 'Domestic'
  }

  const typeCounts = useMemo(() => {
    const counts = {}
    packages.forEach(p => { const badge = getBadge(p); counts[badge] = (counts[badge] || 0) + 1 })
    return counts
  }, [packages])

  const clearAll = () => {
    setSearch('')
    setSortBy('newest')
    setPriceFilter('all')
    setSelectedTypes([])
  }

  const filtered = useMemo(() => {
    let result = [...packages]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) || p.destination?.toLowerCase().includes(q) ||
        p.state?.toLowerCase().includes(q) || p.tags?.toLowerCase().includes(q)
      )
    }

    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(getBadge(p)))
    }

    if (priceFilter !== 'all') {
      const parts = priceFilter.split('-')
      if (priceFilter.endsWith('+')) {
        const min = parseInt(priceFilter.replace('+', ''))
        result = result.filter(p => (p.startingPrice || 0) >= min)
      } else {
        const [min, max] = parts.map(Number)
        result = result.filter(p => { const price = p.startingPrice || 0; return price >= min && price <= max })
      }
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0)); break
      case 'price-high': result.sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0)); break
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      case 'newest': default: result.sort((a, b) => (b.id || 0) - (a.id || 0)); break
    }

    return result
  }, [packages, search, selectedTypes, priceFilter, sortBy])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-[250px] md:h-[320px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&h=500&fit=crop" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="container-wide">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>&gt;</span>
              <Link to="/holidays" className="hover:text-white">Holidays</Link>
              <span>&gt;</span>
              <span className="text-white font-medium">Honeymoon Packages</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">All Honeymoon Packages</h1>
            <p className="text-white/80">{packages.length > 0 ? `${packages.length} romantic packages available` : 'Curated romantic travel experiences'}</p>
          </div>
        </div>
      </section>

      {/* Search + Sort Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="container-wide py-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search honeymoon packages..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none" />
            </div>
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-navy-700 bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none cursor-pointer">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={priceFilter} onChange={e => setPriceFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm text-navy-700 bg-white focus:ring-2 focus:ring-pink-500 focus:outline-none cursor-pointer">
                {PRICE_RANGES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-[88px]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-navy-700" />
                  <h3 className="font-bold text-navy-900 text-lg">Filters</h3>
                </div>
                <button onClick={clearAll} className="text-pink-600 hover:text-pink-700 text-sm font-medium">Clear All</button>
              </div>

              {Object.keys(typeCounts).length > 0 && (
                <div className="mb-5">
                  <h4 className="font-semibold text-navy-800 text-sm mb-3">Package Type</h4>
                  <div className="space-y-2">
                    {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() =>
                          setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
                        } className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                        <span className="text-sm text-navy-700 group-hover:text-navy-900 flex-1">{type}</span>
                        <span className="text-sm text-navy-400">{count}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => {}} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <SlidersHorizontal size={16} /> Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode('card')} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'card' ? 'bg-pink-600 text-white' : 'bg-white border border-gray-200 text-navy-600 hover:bg-gray-50'}`}>
                  <Grid3X3 size={16} /> Card View
                </button>
                <button onClick={() => setViewMode('list')} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'bg-white border border-gray-200 text-navy-600 hover:bg-gray-50'}`}>
                  <List size={16} /> List View
                </button>
              </div>
              <p className="text-sm text-navy-600 font-medium">
                <span className="text-navy-900 font-bold">{filtered.length}</span> Package{filtered.length !== 1 ? 's' : ''} Found
              </p>
            </div>

            {loading && (
              <div className="text-center py-20">
                <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-navy-500">Loading honeymoon packages...</p>
              </div>
            )}

            {!loading && filtered.length > 0 && viewMode === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            )}

            {!loading && filtered.length > 0 && viewMode === 'list' && (
              <div className="space-y-4">
                {filtered.map(pkg => (
                  <Link key={pkg.id} to={`/packages/${pkg.slug || pkg.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col md:flex-row block">
                    <div className="relative w-full md:w-72 h-56 md:h-auto shrink-0 overflow-hidden">
                      <img src={pkg.coverImage || pkg.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600'} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 bg-pink-600 text-white text-xs font-semibold rounded-lg shadow-lg">{getBadge(pkg)}</span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="font-bold text-navy-900 text-lg mb-1 group-hover:text-pink-600 transition-colors">{pkg.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-sm font-semibold text-navy-800">⭐ {pkg.rating || '4.0'}</span>
                        <span className="text-xs text-navy-400">({pkg.reviewCount || 0} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <span className="text-xl font-bold text-pink-600">₹{Number(pkg.startingPrice || 0).toLocaleString('en-IN')}<span className="text-xs text-navy-400 font-normal ml-1">/person</span></span>
                        <span className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">View Details</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loading && packages.length === 0 && (
              <ComingSoon categoryName="Honeymoon Packages" icon="💑" />
            )}

            {!loading && packages.length > 0 && filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-navy-700 mb-2">No packages match your filters</h3>
                <p className="text-navy-500 mb-4">Try adjusting your search or filter criteria</p>
                <button onClick={clearAll} className="text-pink-600 hover:text-pink-700 font-medium">Clear All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
