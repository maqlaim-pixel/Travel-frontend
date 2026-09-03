import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2 } from 'lucide-react'
import api from '../../services/api'

export default function AdminHotels() {
  const [hotels, setHotels] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/hotels').then(res => { setHotels(res.data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = hotels.filter(h => h.name?.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id) => {
    if (!confirm('Delete this hotel?')) return
    try { await api.delete(`/hotels/${id}`); setHotels(prev => prev.filter(h => h.id !== id)) }
    catch { alert('Failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Hotels</h1>
        <Link to="/admin/hotels/new" className="btn-primary text-sm flex items-center gap-2"><Plus size={16} /> Add Hotel</Link>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm"><Search size={16} className="absolute left-3 top-2.5 text-navy-400" />
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>
        {loading ? <div className="p-8 text-center text-navy-500">Loading...</div> : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Hotel</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Location</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Price/Night</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Rating</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Status</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-navy-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(h => (
                <tr key={h.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-navy-900 text-sm">{h.name}</td>
                  <td className="px-5 py-4 text-sm text-navy-600">{h.location}</td>
                  <td className="px-5 py-4 text-sm">₹{h.pricePerNight?.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm">{h.rating} ★</td>
                  <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${h.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{h.status}</span></td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Link to={`/admin/hotels/edit/${h.id}`} className="p-1.5 text-navy-400 hover:text-sky-600"><Edit2 size={14} /></Link>
                      <button onClick={() => handleDelete(h.id)} className="p-1.5 text-navy-400 hover:text-red-600"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="p-8 text-center text-navy-500">No hotels found</p>}
        </div>
        )}
      </div>
    </div>
  )
}
