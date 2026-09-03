import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Star, Loader2, AlertCircle, MessageSquare, Edit2, Trash2 } from 'lucide-react'

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = () => {
    setLoading(true)
    api.get('/customer/reviews')
      .then(res => setReviews(res.data))
      .catch(err => setError(err.response?.data?.error || 'Unable to load reviews'))
      .finally(() => setLoading(false))
  }

  const startEdit = (rev) => {
    setEditingId(rev.id)
    setEditForm({ rating: rev.rating || 5, comment: rev.comment || '' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({ rating: 5, comment: '' })
  }

  const saveEdit = async (reviewId) => {
    if (!editForm.comment.trim()) return
    try {
      await api.put(`/customer/reviews/${reviewId}`, {
        rating: editForm.rating,
        comment: editForm.comment,
      })
      fetchReviews()
      setEditingId(null)
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update review')
    }
  }

  const deleteReview = async (reviewId) => {
    if (!confirm('Delete this review?')) return
    try {
      await api.delete(`/customer/reviews/${reviewId}`)
      fetchReviews()
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete review')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-sky-600" size={32} />
      <span className="ml-3 text-navy-500">Loading reviews...</span>
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
      <p className="text-red-600 font-medium">{error}</p>
      <button onClick={fetchReviews} className="mt-3 text-sky-600 hover:underline text-sm">Try Again</button>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <MessageSquare size={48} className="mx-auto mb-3 text-navy-300" />
          <p className="font-medium text-navy-700">You haven't written any reviews yet.</p>
          <p className="text-sm text-navy-400 mt-1">Your reviews will appear here after you submit them.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => {
            const isEditing = editingId === r.id
            return (
              <div key={r.id} className="bg-white rounded-xl border p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-navy-900">{r.packageName || 'Package'}</h3>
                  {!isEditing && (
                    <div className="flex items-center gap-1">
                      <button onClick={() => startEdit(r)} className="p-1.5 text-navy-400 hover:text-sky-600 rounded" title="Edit review">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteReview(r.id)} className="p-1.5 text-navy-400 hover:text-red-600 rounded" title="Delete review">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-navy-600">Your rating:</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <button key={s} type="button" onClick={() => setEditForm({ ...editForm, rating: s })}>
                            <Star size={18} className={s <= editForm.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 hover:text-amber-300'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      value={editForm.comment}
                      onChange={e => setEditForm({ ...editForm, comment: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none mb-3"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(r.id)} className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Save Changes
                      </button>
                      <button onClick={cancelEdit} className="text-navy-500 hover:text-navy-700 px-4 py-2 rounded-lg text-sm font-medium">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: r.rating || 0 }).map((_, j) => (
                        <Star key={j} size={16} className="text-amber-500 fill-amber-500" />
                      ))}
                      {Array.from({ length: 5 - (r.rating || 0) }).map((_, j) => (
                        <Star key={`empty-${j}`} size={16} className="text-navy-200" />
                      ))}
                      <span className="text-sm text-navy-500 ml-1">{r.rating}/5</span>
                    </div>
                    {r.comment && (
                      <p className="text-navy-600 italic">"{r.comment}"</p>
                    )}
                    {r.images && r.images.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {r.images.map((imgUrl, idx) => (
                          <a key={idx} href={imgUrl} target="_blank" rel="noopener noreferrer">
                            <img src={imgUrl} alt="Review photo" className="w-20 h-20 rounded-lg object-cover border hover:opacity-90" />
                          </a>
                        ))}
                      </div>
                    )}
                    {r.createdAt && (
                      <p className="text-xs text-navy-400 mt-2">
                        {new Date(r.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
