import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import api from '../../../services/api'
import ImageUpload from '../../../components/admin/ImageUpload'

export default function AdminPackageForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '', slug: '', description: '', shortDescription: '',
    destination: '', state: '', country: '',
    durationDays: 5, durationNights: 4, startingPrice: '',
    category: 'domestic', tags: '', coverImage: '',
    highlights: '', inclusions: '', exclusions: '',
    status: 'draft', featured: false, rating: 0
  })

  // Load existing package data when editing
  useEffect(() => {
    if (isEdit) {
      api.get(`/packages/${id}`).then(res => {
        const p = res.data
        setForm({
          title: p.title || '',
          slug: p.slug || '',
          description: p.description || '',
          shortDescription: p.shortDescription || '',
          destination: p.destination || '',
          state: p.state || '',
          country: p.country || '',
          durationDays: p.durationDays || 0,
          durationNights: p.durationNights || 0,
          startingPrice: p.startingPrice || '',
          category: p.category || 'domestic',
          tags: p.tags || '',
          coverImage: p.coverImage || '',
          highlights: p.highlights || '',
          inclusions: p.inclusions || '',
          exclusions: p.exclusions || '',
          status: p.status || 'draft',
          featured: p.featured || false,
          rating: p.rating || 0,
          images: p.coverImage ? [{ url: p.coverImage, isUploaded: false }] : [],
        })
      }).catch(err => {
        console.error('Failed to load package:', err)
        setError('Failed to load package data')
      })
    }
  }, [id, isEdit])

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const autoSlug = (title) => {
    set('title', title)
    set('slug', title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { ...form, startingPrice: parseFloat(form.startingPrice) || 0 }
      if (isEdit) {
        await api.put(`/packages/${id}`, payload)
      } else {
        await api.post('/packages', payload)
      }
      navigate('/admin/packages')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save package')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/packages" className="p-2 rounded-lg hover:bg-navy-50"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Package' : 'Add New Package'}</h1>
      </div>

      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-bold text-navy-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Package Title *</label>
              <input className={inputClass} value={form.title} onChange={e => autoSlug(e.target.value)} required placeholder="e.g. Rajasthan Heritage Tour" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Slug *</label>
              <input className={inputClass} value={form.slug} onChange={e => set('slug', e.target.value)} required placeholder="rajasthan-heritage-tour" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Short Description</label>
            <input className={inputClass} value={form.shortDescription} onChange={e => set('shortDescription', e.target.value)} placeholder="One-liner for cards" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Full Description</label>
            <textarea className={inputClass + " resize-none"} rows={4} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Detailed package description..." />
          </div>
        </div>

        {/* Location & Pricing */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-bold text-navy-900">Destination & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Destination</label>
              <input className={inputClass} value={form.destination} onChange={e => set('destination', e.target.value)} placeholder="Rajasthan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">State</label>
              <input className={inputClass} value={form.state} onChange={e => set('state', e.target.value)} placeholder="Rajasthan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Country</label>
              <input className={inputClass} value={form.country} onChange={e => set('country', e.target.value)} placeholder="India" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Duration (Days)</label>
              <input type="number" className={inputClass} value={form.durationDays} onChange={e => set('durationDays', parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Duration (Nights)</label>
              <input type="number" className={inputClass} value={form.durationNights} onChange={e => set('durationNights', parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Starting Price (₹) *</label>
              <input type="number" className={inputClass} value={form.startingPrice} onChange={e => set('startingPrice', e.target.value)} required placeholder="14999" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
              <select className={inputClass} value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-bold text-navy-900">Details</h2>
          <ImageUpload
            label="Package Images (up to 3)"
            images={form.images || (form.coverImage ? [{ url: form.coverImage, isUploaded: false }] : [])}
            onChange={(imgs) => {
              set('images', imgs)
              if (imgs.length > 0) set('coverImage', imgs[0].url)
            }}
            maxImages={3}
          />
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Highlights (one per line)</label>
            <textarea className={inputClass + " resize-none"} rows={3} value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="Heritage hotel stays\nDesert safari\nBoat ride" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Inclusions (one per line)</label>
            <textarea className={inputClass + " resize-none"} rows={3} value={form.inclusions} onChange={e => set('inclusions', e.target.value)} placeholder="5 nights accommodation\nDaily breakfast\nAC transport" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Exclusions (one per line)</label>
            <textarea className={inputClass + " resize-none"} rows={3} value={form.exclusions} onChange={e => set('exclusions', e.target.value)} placeholder="Airfare\nLunch\nPersonal expenses" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Tags (comma-separated)</label>
            <input className={inputClass} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Heritage, Culture, Family" />
          </div>
        </div>

        {/* Publishing */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="block text-sm font-medium text-navy-700">Status</label>
              <select className={inputClass + " w-auto"} value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="rounded" />
                Featured
              </label>
            </div>
            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              <Save size={16} /> {saving ? 'Saving...' : (isEdit ? 'Update Package' : 'Create Package')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
