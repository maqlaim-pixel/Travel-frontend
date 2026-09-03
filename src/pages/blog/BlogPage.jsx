import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, User } from 'lucide-react'
import api from '../../services/api'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  useEffect(() => {
    api.get('/blogs').then(res => setPosts(res.data)).catch(() => {})
  }, [])

  const filtered = posts.filter(p => {
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'All' || p.category === cat
    return matchSearch && matchCat
  })

  return (
    <div>
      <section className="relative bg-gradient-to-br from-navy-900 to-sky-900 text-white py-16">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Travel Blog</h1>
          <p className="text-navy-200 max-w-xl mx-auto mb-8">Stories, guides, and tips from our travel experts</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-3.5 text-navy-400" />
            <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-navy-900 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>
      </section>

      <div className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {['All', 'Destinations', 'Travel Guide', 'Budget Tips', 'Tips'].map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === c ? 'bg-sky-600 text-white' : 'bg-white text-navy-700 hover:bg-navy-50 border'
                }`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <Link key={p.id || p.slug} to={`/blog/${p.slug || p.id}`} className="card overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  <span className="absolute top-3 left-3 badge-blue">{p.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-navy-500 mb-2">
                    <span className="flex items-center gap-1"><User size={12} /> {p.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {p.readTime}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-navy-500 line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-navy-500 py-12">No posts found</p>}
        </div>
      </div>
    </div>
  )
}
