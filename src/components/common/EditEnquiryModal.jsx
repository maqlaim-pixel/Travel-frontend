import { useState, useEffect } from 'react'
import { X, Save, Loader2, Calendar, Users, DollarSign, MessageSquare, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import api from '../../services/api'

export default function EditEnquiryModal({ isOpen, onClose, enquiry, editExpiresAt, onSave }) {
  const [form, setForm] = useState({
    travelDate: '',
    travelers: 1,
    budget: '',
    message: ''
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [remainingTime, setRemainingTime] = useState('')
  const [isExpired, setIsExpired] = useState(false)

  // Initialize form when enquiry changes
  useEffect(() => {
    if (enquiry) {
      setForm({
        travelDate: enquiry.travelDate || '',
        travelers: enquiry.travelers || 1,
        budget: enquiry.budget || '',
        message: enquiry.message || ''
      })
    }
  }, [enquiry])

  // Countdown timer for edit window
  useEffect(() => {
    if (!editExpiresAt) return

    const updateCountdown = () => {
      const now = new Date()
      const expires = new Date(editExpiresAt)
      const diff = expires - now

      if (diff <= 0) {
        setIsExpired(true)
        setRemainingTime('Edit window expired')
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setRemainingTime(`${hours}h ${minutes}m ${seconds}s remaining`)
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [editExpiresAt])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      await api.put(`/customer/enquiries/${enquiry.id}`, form)
      setSuccess('Enquiry updated successfully!')
      setTimeout(() => {
        onSave?.()
        onClose?.()
      }, 1500)
    } catch (err) {
      if (err.response?.data?.code === 'EDIT_EXPIRED') {
        setIsExpired(true)
        setError('Edit window expired. Please verify OTP again.')
      } else {
        setError(err.response?.data?.error || 'Failed to update enquiry')
      }
    }
    setSaving(false)
  }

  if (!isOpen || !enquiry) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-navy-900 text-lg">Edit Enquiry</h3>
              <p className="text-xs text-navy-500 font-mono">#{enquiry.enquiryRef}</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={18} className="text-navy-400" />
            </button>
          </div>
        </div>

        {/* Countdown Banner */}
        {remainingTime && (
          <div className={`px-6 py-3 flex items-center gap-2 text-sm ${isExpired ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
            <Clock size={16} />
            <span className="font-medium">{remainingTime}</span>
            {isExpired && <AlertTriangle size={14} className="ml-auto" />}
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-5">
          {isExpired ? (
            <div className="text-center py-8">
              <AlertTriangle size={48} className="mx-auto mb-4 text-red-400" />
              <h4 className="font-bold text-red-700 text-lg mb-2">Edit Window Expired</h4>
              <p className="text-sm text-navy-500 mb-4">
                The 3-hour edit period has ended. Please verify OTP again to make changes.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Success/Error */}
              {success && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                  <CheckCircle size={16} className="text-green-600" />
                  <p className="text-sm text-green-700 font-medium">{success}</p>
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertTriangle size={16} className="text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Package Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-navy-900">{enquiry.packageName || 'Package'}</p>
                <p className="text-xs text-navy-500">{enquiry.destination || 'Destination'}</p>
              </div>

              {/* Travel Date */}
              <div>
                <label className="text-sm font-medium text-navy-700 mb-2 flex items-center gap-2">
                  <Calendar size={14} /> Travel Date
                </label>
                <input
                  type="date"
                  value={form.travelDate}
                  onChange={e => setForm(prev => ({ ...prev, travelDate: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* Travelers */}
              <div>
                <label className="text-sm font-medium text-navy-700 mb-2 flex items-center gap-2">
                  <Users size={14} /> Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={form.travelers}
                  onChange={e => setForm(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="text-sm font-medium text-navy-700 mb-2 flex items-center gap-2">
                  <DollarSign size={14} /> Budget
                </label>
                <select
                  value={form.budget}
                  onChange={e => setForm(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="">Select budget range</option>
                  <option value="Under ₹10K">Under ₹10,000</option>
                  <option value="₹10K - ₹25K">₹10,000 - ₹25,000</option>
                  <option value="₹25K - ₹50K">₹25,000 - ₹50,000</option>
                  <option value="₹50K - ₹1L">₹50,000 - ₹1,00,000</option>
                  <option value="₹1L+">₹1,00,000+</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-navy-700 mb-2 flex items-center gap-2">
                  <MessageSquare size={14} /> Message / Special Requirements
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Any special requirements or preferences..."
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving...</>
                ) : (
                  <><Save size={16} /> Save Changes</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
