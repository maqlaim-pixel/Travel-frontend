import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import api from '../../services/api'

export default function AdminBlogForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '', slug: '', category: 'Destinations', author: '',
    excerpt: '', content: '', image: '', readTime: '5 min read', status: 'draft'
  })

  useEffect(() => {
    if (isEdit) api.get(`/blogs/${id}`).then(res => setForm(res.data))
  }, [id, isEdit])

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const autoSlug = (t) => { set('title', t); set('slug', t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }
  const cls = "w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      if (isEdit) await api.put(`/blogs/${id}`, form); else await api.post('/blogs', form)
      navigate('/admin/blogs')
    } catch (err) { setError(err.response?.data?.error || 'Failed to save') }
    finally { setSaving(false) }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/blogs" className="p-2 rounded-lg hover:bg-navy-50"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit' : 'New'} Blog Post</h1>
      </div>
      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Title *</label><input className={cls} value={form.title} onChange={e => autoSlug(e.target.value)} required /></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Slug *</label><input className={cls} value={form.slug} onChange={e => set('slug', e.target.value)} required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
              <select className={cls} value={form.category} onChange={e => set('category', e.target.value)}>
                <option>Destinations</option><option>Travel Guide</option><option>Budget Tips</option><option>Tips</option>
              </select></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Author</label><input className={cls} value={form.author} onChange={e => set('author', e.target.value)} placeholder="Priya Sharma" /></div>
            <div><label className="block text-sm font-medium text-navy-700 mb-1">Read Time</label><input className={cls} value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="5 min read" /></div>
          </div>
          <div><label className="block text-sm font-medium text-navy-700 mb-1">Image URL</label><input className={cls} value={form.image} onChange={e => set('image', e.target.value)} placeholder="https://..." /></div>
          <div><label className="block text-sm font-medium text-navy-700 mb-1">Excerpt</label><textarea className={cls + " resize-none"} rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} /></div>
          <div><label className="block text-sm font-medium text-navy-700 mb-1">Content</label><textarea className={cls + " resize-none"} rows={10} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Write your blog post content here..." /></div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <select className={cls + " w-auto"} value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="draft">Draft</option><option value="published">Published</option>
            </select>
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2"><Save size={16} /> {saving ? 'Saving...' : 'Save Post'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}
