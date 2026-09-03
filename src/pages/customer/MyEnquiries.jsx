import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Loader2, AlertCircle, MessageCircle, Calendar, MapPin, Edit3, Trash2, Shield, Clock, CheckCircle, Users, RefreshCw } from 'lucide-react'
import OtpVerificationModal from '../../components/common/OtpVerificationModal'
import EditEnquiryModal from '../../components/common/EditEnquiryModal'
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
  cancelled: 'bg-gray-100 text-gray-600',
}

const STATUS_LABELS = {
  pending: 'Pending',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
}

export default function MyEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // OTP Modal state
  const [otpModal, setOtpModal] = useState({ open: false, recordId: null, purpose: null })

  // Edit Modal state
  const [editModal, setEditModal] = useState({ open: false, enquiry: null, expiresAt: null })

  // Delete Modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, recordId: null, recordLabel: '', expiresAt: null })

  // Track edit session expiry times
  const [editSessions, setEditSessions] = useState({})
  const [deleteSessions, setDeleteSessions] = useState({})

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const res = await api.get('/customer/enquiries')
      setEnquiries(Array.isArray(res.data) ? res.data : [])

      // Build session maps
      const editMap = {}
      const deleteMap = {}
      for (const e of res.data) {
        if (e.canEdit && e.editExpiresAt) editMap[e.id] = e.editExpiresAt
        if (e.canDelete && e.deleteExpiresAt) deleteMap[e.id] = e.deleteExpiresAt
      }
      setEditSessions(editMap)
      setDeleteSessions(deleteMap)
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to load enquiries')
    }
    setLoading(false)
  }

  useEffect(() => { fetchEnquiries() }, [])

  // OTP success handler
  const handleOtpSuccess = (data) => {
    const { purpose } = data
    const recordId = otpModal.recordId

    if (purpose === 'edit') {
      setEditSessions(prev => ({ ...prev, [recordId]: data.expiresAt }))
      // Open edit modal
      const enquiry = enquiries.find(e => e.id === recordId)
      setEditModal({ open: true, enquiry, expiresAt: data.expiresAt })
    } else if (purpose === 'delete') {
      setDeleteSessions(prev => ({ ...prev, [recordId]: data.expiresAt }))
      // Open delete modal
      const enquiry = enquiries.find(e => e.id === recordId)
      setDeleteModal({
        open: true,
        recordId,
        recordLabel: `${enquiry?.packageName || 'Enquiry'} — ${enquiry?.enquiryRef || ''}`,
        expiresAt: data.expiresAt
      })
    }
  }

  // Handle edit button click
  const handleEditClick = (enquiry) => {
    if (editSessions[enquiry.id]) {
      // Already have active edit session — open edit modal directly
      setEditModal({ open: true, enquiry, expiresAt: editSessions[enquiry.id] })
    } else {
      // Need OTP verification
      setOtpModal({ open: true, recordId: enquiry.id, purpose: 'edit' })
    }
  }

  // Handle delete button click
  const handleDeleteClick = (enquiry) => {
    if (deleteSessions[enquiry.id]) {
      // Already have active delete session — open delete modal directly
      setDeleteModal({
        open: true,
        recordId: enquiry.id,
        recordLabel: `${enquiry.packageName || 'Enquiry'} — ${enquiry.enquiryRef || ''}`,
        expiresAt: deleteSessions[enquiry.id]
      })
    } else {
      // Need OTP verification
      setOtpModal({ open: true, recordId: enquiry.id, purpose: 'delete' })
    }
  }

  // Countdown component
  function CountdownTimer({ expiresAt, label }) {
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
      if (!expiresAt) return
      const update = () => {
        const diff = new Date(expiresAt) - new Date()
        if (diff <= 0) { setRemaining('Expired'); return }
        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        setRemaining(`${h}h ${m}m`)
      }
      update()
      const t = setInterval(update, 60000)
      return () => clearInterval(t)
    }, [expiresAt])

    if (!expiresAt || remaining === 'Expired') return null

    return (
      <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
        <Clock size={12} /> {label} {remaining}
      </span>
    )
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="animate-spin text-sky-600" size={32} />
      <span className="ml-3 text-navy-500">Loading enquiries...</span>
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <AlertCircle className="mx-auto text-red-400 mb-3" size={40} />
      <p className="text-red-600 font-medium">{error}</p>
      <button onClick={fetchEnquiries} className="mt-3 text-sky-600 hover:underline text-sm flex items-center gap-1 mx-auto">
        <RefreshCw size={14} /> Try Again
      </button>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-2">My Enquiries</h1>
      <p className="text-sm text-navy-500 mb-6">Manage your travel enquiries. You can edit or delete within 3 hours of verification.</p>

      {enquiries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <MessageCircle size={48} className="mx-auto mb-3 text-navy-300" />
          <p className="font-medium text-navy-700">No enquiries yet.</p>
          <p className="text-sm text-navy-400 mt-1">Browse packages and click "Enquire Now" to get started.</p>
          <Link to="/packages" className="inline-block mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
            Browse Packages
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(e => (
            <div key={e.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-navy-400 font-mono">#{e.enquiryRef}</p>
                  <h3 className="font-bold text-navy-900 mt-1">{e.packageName || 'Package'}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {/* Countdown badges */}
                  <CountdownTimer expiresAt={editSessions[e.id]} label="Edit" />
                  <CountdownTimer expiresAt={deleteSessions[e.id]} label="Delete" />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[e.status] || STATUS_STYLES.pending}`}>
                    {STATUS_LABELS[e.status] || e.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-navy-600 mb-2">
                {e.destination && (
                  <span className="flex items-center gap-1"><MapPin size={14} /> {e.destination}</span>
                )}
                {e.travelDate && (
                  <span className="flex items-center gap-1"><Calendar size={14} /> Travel: {e.travelDate}</span>
                )}
                {e.travelers && (
                  <span className="flex items-center gap-1"><Users size={14} /> {e.travelers} traveler{e.travelers > 1 ? 's' : ''}</span>
                )}
                {e.budget && (
                  <span>💰 {e.budget}</span>
                )}
              </div>

              {e.adminNotes && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <span className="font-medium">Admin note:</span> {e.adminNotes}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-navy-400">
                  Enquired on {e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      editSessions[e.id]
                        ? 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                        : 'bg-gray-100 text-navy-600 hover:bg-gray-200'
                    }`}
                  >
                    {editSessions[e.id] ? <CheckCircle size={13} /> : <Shield size={13} />}
                    {editSessions[e.id] ? 'Edit' : 'Verify to Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteClick(e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      deleteSessions[e.id]
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-navy-600 hover:bg-gray-200'
                    }`}
                  >
                    {deleteSessions[e.id] ? <Trash2 size={13} /> : <Shield size={13} />}
                    {deleteSessions[e.id] ? 'Delete' : 'Verify to Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OTP Modal */}
      <OtpVerificationModal
        isOpen={otpModal.open}
        onClose={() => setOtpModal({ open: false, recordId: null, purpose: null })}
        recordId={otpModal.recordId}
        recordType="enquiry"
        purpose={otpModal.purpose}
        onSuccess={handleOtpSuccess}
        baseUrl="customer/enquiries"
      />

      {/* Edit Modal */}
      <EditEnquiryModal
        isOpen={editModal.open}
        onClose={() => setEditModal({ open: false, enquiry: null, expiresAt: null })}
        enquiry={editModal.enquiry}
        editExpiresAt={editModal.expiresAt}
        onSave={fetchEnquiries}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, recordId: null, recordLabel: '', expiresAt: null })}
        recordId={deleteModal.recordId}
        recordType="enquiry"
        recordLabel={deleteModal.recordLabel}
        deleteExpiresAt={deleteModal.expiresAt}
        onSuccess={fetchEnquiries}
        baseUrl="customer/enquiries"
      />
    </div>
  )
}
