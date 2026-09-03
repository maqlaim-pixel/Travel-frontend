import { useState, useEffect } from 'react'
import { X, Trash2, Loader2, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import api from '../../services/api'

export default function DeleteConfirmModal({ isOpen, onClose, recordId, recordType, recordLabel, deleteExpiresAt, onSuccess, baseUrl }) {
  // baseUrl: 'customer/enquiries' or 'leads'
  const [deleting, setDeleting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [remainingTime, setRemainingTime] = useState('')
  const [isExpired, setIsExpired] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (!deleteExpiresAt) return

    const updateCountdown = () => {
      const now = new Date()
      const expires = new Date(deleteExpiresAt)
      const diff = expires - now

      if (diff <= 0) {
        setIsExpired(true)
        setRemainingTime('Delete window expired')
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
  }, [deleteExpiresAt])

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setConfirmed(false)
      setError('')
      setSuccess('')
    }
  }, [isOpen])

  const handleDelete = async () => {
    setDeleting(true)
    setError('')
    try {
      const delUrl = baseUrl ? `/${baseUrl}/${recordId}` : `/leads/${recordId}`
      await api.delete(delUrl)
      setSuccess('Record deleted successfully!')
      setTimeout(() => {
        onSuccess?.()
        onClose?.()
      }, 1500)
    } catch (err) {
      if (err.response?.data?.code === 'DELETE_EXPIRED') {
        setIsExpired(true)
        setError('Delete window expired. Please verify OTP again.')
      } else {
        setError(err.response?.data?.error || 'Failed to delete')
      }
    }
    setDeleting(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900">Delete {recordType === 'enquiry' ? 'Enquiry' : 'Lead'}</h3>
                <p className="text-xs text-navy-500">This action cannot be undone</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white rounded-lg transition-colors">
              <X size={18} className="text-navy-400" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Countdown */}
          {remainingTime && !isExpired && (
            <div className="flex items-center gap-2 bg-amber-50 text-amber-700 rounded-lg p-3 mb-4 text-sm">
              <Clock size={14} />
              <span className="font-medium">{remainingTime}</span>
            </div>
          )}

          {isExpired ? (
            <div className="text-center py-4">
              <AlertTriangle size={40} className="mx-auto mb-3 text-red-400" />
              <h4 className="font-bold text-red-700 mb-2">Delete Window Expired</h4>
              <p className="text-sm text-navy-500 mb-4">The delete period has ended. Please verify OTP again.</p>
              <button onClick={onClose} className="px-6 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700">
                Close
              </button>
            </div>
          ) : success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h4 className="font-bold text-green-700 text-lg">Deleted Successfully</h4>
            </div>
          ) : (
            <>
              {/* Record Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="font-medium text-navy-900 text-sm">{recordLabel || `Record #${recordId}`}</p>
                <p className="text-xs text-navy-500 mt-1">This record will be permanently removed from the system.</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <AlertTriangle size={16} className="text-red-500" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Confirmation Checkbox */}
              <label className="flex items-start gap-3 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={e => setConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm text-navy-700">
                  I understand this action is permanent and cannot be undone
                </span>
              </label>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-gray-200 text-navy-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting || !confirmed}
                  className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <><Loader2 size={16} className="animate-spin" /> Deleting...</>
                  ) : (
                    <><Trash2 size={16} /> Delete Permanently</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
