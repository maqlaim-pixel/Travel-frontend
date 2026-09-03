import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2, Eye, ExternalLink, Package } from 'lucide-react'
import api from '../../services/api'

export default function AdminPackages() {
  const [packages, setPackages] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/packages').then(res => {
      setPackages(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = packages.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id) => {
    if (!confirm('Delete this package?')) return
    try {
      await api.delete(`/packages/${id}`)
      setPackages(prev => prev.filter(p => p.id !== id))
    } catch (err) { alert('Failed to delete') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Packages</h1>
        <Link to="/admin/packages/new" className="btn-primary text-sm flex items-center gap-2">
          <Plus size={16} /> Add Package
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3 top-2.5 text-navy-400" />
            <input type="text" placeholder="Search packages..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>
        {loading ? (
          <div className="p-8 text-center text-navy-500">Loading packages...</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Package</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Destination</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Price</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Duration</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(pkg => (
                <tr key={pkg.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-navy-900 text-sm">{pkg.title}</p>
                    <p className="text-xs text-navy-500">{pkg.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-navy-600">{pkg.destination}</td>
                  <td className="px-5 py-4 text-sm font-medium text-navy-900">₹{pkg.startingPrice?.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-navy-600">{pkg.durationDays}D/{pkg.durationNights}N</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${pkg.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{pkg.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/packages/${pkg.slug}`} target="_blank" className="p-1.5 text-navy-400 hover:text-emerald-600 transition-colors"><ExternalLink size={14} /></Link>
                      <Link to={`/admin/packages/edit/${pkg.id}`} className="p-1.5 text-navy-400 hover:text-sky-600 transition-colors"><Edit2 size={14} /></Link>
                      <button onClick={() => handleDelete(pkg.id)} className="p-1.5 text-navy-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="p-8 text-center text-navy-500">No packages found</p>}
        </div>
        )}
      </div>
    </div>
  )
}
