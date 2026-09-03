import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import api from '../../services/api'

export default function AdminActivityForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', slug: '', location: '', category: 'Adventure',
    description: '', image: '', duration: '', difficulty: 'Moderate',
    price: '', rating: 4.5, highlights: '', bestTime: '', status: 'draft'
  })

  useEffect(() => {
    if (isEdit) api.get(`/activities/${id}`).then(res => setForm(res.data))
  }, [id, isEdit])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const autoSlug = (n) => { set('name', n); set('slug', n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }
  const cls = "w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      const payload = { ...form, price: parseFloat(form.price) || 0, rating: parseFloat(form.rating) || 0 }
      if (isEdit) await api.put(`/activities/${id}`, payload); else await api.post('/activities', payload)
      navigate('/admin/activities')
    } catch (err) { setError(err.response?.data?.error || 'Failed to save') }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/activities" className="p-2 rounded-lg hover:bg-navy-50"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit' : 'Add'} Activity</h1>
      </div>
      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-bold text-navy-900">Activity Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Name *</label><input className={cls} value={form.name} onChange={e => autoSlug(e.target.value)} required /></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Slug *</label><input className={cls} value={form.slug} onChange={e => set('slug', e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Location</label><input className={cls} value={form.location} onChange={e => set('location', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
              <select className={cls} value={form.category} onChange={e => set('category', e.target.value)}>
                <option>Adventure</option><option>Water Sports</option><option>Trekking</option><option>Wildlife</option><option>Cultural</option>
              </select></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Duration</label><input className={cls} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="1 Day" /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Difficulty</label>
              <select className={cls} value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
                <option>Easy</option><option>Moderate</option><option>Expert</option>
              </select></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Price (₹)</label><input type="number" className={cls} value={form.price} onChange={e => set('price', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Rating</label><input type="number" step="0.1" className={cls} value={form.rating} onChange={e => set('rating', e.target.value)} /></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Image URL</label><input className={cls} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." /></div>
          </div>
          <div><label className="block text-sm font-medium text-navy-700 mb-1">Description</label>
            <textarea className={cls + " resize-none"} rows={3} value={form.description} onChange={e => set('description', e.target.value)} /></div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <select className={cls + " w-auto"} value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="draft">Draft</option><option value="published">Published</option>
            </select>
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : 'Save Activity'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}
