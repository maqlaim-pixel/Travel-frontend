import { useState, useEffect } from 'react'
import { Search, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, Loader2, RefreshCw, CheckCircle, XCircle, Clock, Trash2, AlertTriangle, X } from 'lucide-react'
import api from '../../services/api'

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  pending: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-green-100 text-green-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-100 text-gray-600',
  closed: 'bg-gray-100 text-gray-600',
}

const STATUS_OPTIONS = ['pending', 'contacted', 'confirmed', 'rejected']

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [activeTab, setActiveTab] = useState('leads')
  const [updatingId, setUpdatingId] = useState(null)

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, type: null, name: '' })
  const [deleteReason, setDeleteReason] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState('')

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads')
      setLeads(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Failed to fetch leads:', err)
      setLeads([])
    }
  }

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/admin/enquiries')
      setEnquiries(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Failed to fetch enquiries:', err)
      setEnquiries([])
    }
  }

  const fetchAll = async () => {
    setLoading(true)
    await Promise.all([fetchLeads(), fetchEnquiries()])
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const updateEnquiryStatus = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await api.put(`/admin/enquiries/${id}`, { status: newStatus })
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
    } catch (err) {
      console.error('Failed to update:', err)
    }
    setUpdatingId(null)
  }

  const updateLeadStatus = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await api.put(`/leads/${id}/status`, { status: newStatus })
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
    } catch (err) {
      console.error('Failed to update:', err)
    }
    setUpdatingId(null)
  }

  const openDeleteModal = (id, type, name) => {
    setDeleteModal({ open: true, id, type, name })
    setDeleteReason('')
    setDeleteSuccess('')
  }

  const handleAdminDelete = async () => {
    if (!deleteReason.trim()) return
    setDeleting(true)
    try {
      const endpoint = deleteModal.type === 'lead'
        ? `/leads/admin/${deleteModal.id}`
        : `/admin/enquiries/${deleteModal.id}`
      await api.delete(endpoint, { data: { reason: deleteReason } })
      setDeleteSuccess('Record deleted successfully! Audit log created.')

      // Remove from local state
      if (deleteModal.type === 'lead') {
        setLeads(prev => prev.filter(l => l.id !== deleteModal.id))
      } else {
        setEnquiries(prev => prev.filter(e => e.id !== deleteModal.id))
      }

      setTimeout(() => {
        setDeleteModal({ open: false, id: null, type: null, name: '' })
        setDeleteSuccess('')
      }, 1500)
    } catch (err) {
      console.error('Failed to delete:', err)
      setDeleteSuccess('')
    }
    setDeleting(false)
  }

  const filteredLeads = leads.filter(l => {
    const matchSearch = !search ||
      (l.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.destination || '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || l.status === filter
    return matchSearch && matchFilter
  })

  const filteredEnquiries = enquiries.filter(e => {
    const matchSearch = !search ||
      (e.userName || '').toLowerCase().includes(search.toLowerCase()) ||
      (e.userEmail || '').toLowerCase().includes(search.toLowerCase()) ||
      (e.packageName || '').toLowerCase().includes(search.toLowerCase()) ||
      (e.destination || '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || e.status === filter
    return matchSearch && matchFilter
  })

  const allItems = activeTab === 'leads' ? filteredLeads : filteredEnquiries
  const pendingCount = activeTab === 'leads'
    ? leads.filter(l => l.status === 'new' || l.status === 'pending').length
    : enquiries.filter(e => e.status === 'pending').length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Leads & Enquiries</h1>
          <p className="text-sm text-navy-500 mt-1">
            {leads.length} leads · {enquiries.length} enquiries
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{pendingCount} New</span>
          <button onClick={fetchAll} className="p-2 rounded-lg hover:bg-gray-100" title="Refresh">
            <RefreshCw size={16} className="text-navy-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leads' ? 'bg-white text-sky-600 shadow-sm' : 'text-navy-600 hover:text-navy-800'
          }`}
        >
          Leads ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'enquiries' ? 'bg-white text-sky-600 shadow-sm' : 'text-navy-600 hover:text-navy-800'
          }`}
        >
          Package Enquiries ({enquiries.length})
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-2.5 text-navy-400" />
          <input
            type="text"
            placeholder="Search by name, email, package..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>
        {['all', 'new', 'pending', 'contacted', 'confirmed', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-sky-600 text-white' : 'bg-white text-navy-600 border hover:bg-navy-50'
            }`}>{f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-sky-600" />
        </div>
      ) : allItems.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <MessageSquare size={40} className="mx-auto text-navy-300 mb-3" />
          <p className="text-navy-500">No {activeTab} found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeTab === 'leads' ? (
            filteredLeads.map(lead => (
              <div key={lead.id} className="bg-white rounded-xl border overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === `lead-${lead.id}` ? null : `lead-${lead.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sm font-bold text-sky-600">
                      {(lead.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-navy-900 text-sm">{lead.name || 'Unknown'}</p>
                      <p className="text-xs text-navy-500">
                        {lead.destination || 'No destination'} · {lead.phone || lead.email || 'No contact'}
                        {lead.createdAt && ` · ${new Date(lead.createdAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                      {lead.status}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); openDeleteModal(lead.id, 'lead', lead.name || 'Unknown') }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-navy-400 hover:text-red-600 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 size={14} />
                    </button>
                    {expanded === `lead-${lead.id}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                {expanded === `lead-${lead.id}` && (
                  <div className="border-t p-4 bg-gray-50 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><span className="text-navy-500">Name:</span> <p className="text-navy-900 font-medium">{lead.name || '—'}</p></div>
                      <div><span className="text-navy-500">Email:</span> <p className="text-navy-900">{lead.email || '—'}</p></div>
                      <div><span className="text-navy-500">Phone:</span> <p className="text-navy-900">{lead.phone || '—'}</p></div>
                      <div><span className="text-navy-500">Destination:</span> <p className="text-navy-900">{lead.destination || '—'}</p></div>
                      <div><span className="text-navy-500">Package:</span> <p className="text-navy-900">{lead.package || '—'}</p></div>
                      <div><span className="text-navy-500">Source:</span> <p className="text-navy-900">{lead.source || 'Website'}</p></div>
                      <div><span className="text-navy-500">Travel Date:</span> <p className="text-navy-900">{lead.travelDate || '—'}</p></div>
                      <div><span className="text-navy-500">Budget:</span> <p className="text-navy-900">{lead.budget || '—'}</p></div>
                    </div>
                    {lead.message && (
                      <div><span className="text-navy-500 text-sm">Message:</span> <p className="text-navy-700 text-sm mt-1">{lead.message}</p></div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {STATUS_OPTIONS.map(s => (
                        <button key={s}
                          onClick={() => updateLeadStatus(lead.id, s)}
                          disabled={updatingId === lead.id}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            lead.status === s
                              ? 'bg-sky-600 text-white'
                              : 'bg-white border text-navy-600 hover:bg-navy-50'
                          }`}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            filteredEnquiries.map(enq => (
              <div key={enq.id} className="bg-white rounded-xl border overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === `enq-${enq.id}` ? null : `enq-${enq.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                      {(enq.userName || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-navy-900 text-sm">{enq.userName || 'Unknown'} · <span className="text-sky-600 font-mono text-xs">{enq.enquiryRef}</span></p>
                      <p className="text-xs text-navy-500">
                        {enq.packageName || 'No package'} · {enq.destination || '—'}
                        {enq.createdAt && ` · ${new Date(enq.createdAt).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[enq.status] || 'bg-gray-100 text-gray-600'}`}>
                      {enq.status}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); openDeleteModal(enq.id, 'enquiry', `${enq.userName || 'Unknown'} — ${enq.enquiryRef || ''}`) }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-navy-400 hover:text-red-600 transition-colors"
                      title="Delete Enquiry"
                    >
                      <Trash2 size={14} />
                    </button>
                    {expanded === `enq-${enq.id}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                {expanded === `enq-${enq.id}` && (
                  <div className="border-t p-4 bg-gray-50 space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><span className="text-navy-500">Name:</span> <p className="text-navy-900 font-medium">{enq.userName || '—'}</p></div>
                      <div><span className="text-navy-500">Email:</span> <p className="text-navy-900">{enq.userEmail || '—'}</p></div>
                      <div><span className="text-navy-500">Phone:</span> <p className="text-navy-900">{enq.userPhone || '—'}</p></div>
                      <div><span className="text-navy-500">Package:</span> <p className="text-navy-900">{enq.packageName || '—'}</p></div>
                      <div><span className="text-navy-500">Destination:</span> <p className="text-navy-900">{enq.destination || '—'}</p></div>
                      <div><span className="text-navy-500">Travelers:</span> <p className="text-navy-900">{enq.travelers || '—'}</p></div>
                      <div><span className="text-navy-500">Budget:</span> <p className="text-navy-900">{enq.budget || '—'}</p></div>
                      <div><span className="text-navy-500">Travel Date:</span> <p className="text-navy-900">{enq.travelDate || '—'}</p></div>
                    </div>
                    {enq.message && (
                      <div><span className="text-navy-500 text-sm">Message:</span> <p className="text-navy-700 text-sm mt-1">{enq.message}</p></div>
                    )}
                    {enq.adminNotes && (
                      <div className="bg-yellow-50 p-2 rounded text-sm"><span className="text-yellow-700">Admin Notes:</span> {enq.adminNotes}</div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {STATUS_OPTIONS.map(s => (
                        <button key={s}
                          onClick={() => updateEnquiryStatus(enq.id, s)}
                          disabled={updatingId === enq.id}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                            enq.status === s
                              ? 'bg-sky-600 text-white'
                              : 'bg-white border text-navy-600 hover:bg-navy-50'
                          }`}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Admin Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle size={18} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">Admin Delete</h3>
                    <p className="text-xs text-navy-500">This action will be logged in the audit trail</p>
                  </div>
                </div>
                <button onClick={() => setDeleteModal({ open: false, id: null, type: null, name: '' })} className="p-1 hover:bg-white rounded-lg">
                  <X size={18} className="text-navy-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {deleteSuccess ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-700 text-lg">{deleteSuccess}</h4>
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-navy-900">{deleteModal.name}</p>
                    <p className="text-xs text-navy-500 mt-1">Type: {deleteModal.type === 'lead' ? 'Lead' : 'Package Enquiry'}</p>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-navy-700 mb-2 block">
                      Reason for deletion <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deleteReason}
                      onChange={e => setDeleteReason(e.target.value)}
                      className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                      <option value="">Select a reason...</option>
                      <option value="Fake / Spam enquiry">Fake / Spam enquiry</option>
                      <option value="Invalid contact information">Invalid contact information</option>
                      <option value="Duplicate record">Duplicate record</option>
                      <option value="Test / Demo data">Test / Demo data</option>
                      <option value="Requested by user">Requested by user</option>
                      <option value="Policy violation">Policy violation</option>
                      <option value="Other">Other (specify below)</option>
                    </select>
                  </div>

                  {deleteReason === 'Other' && (
                    <div className="mb-4">
                      <textarea
                        placeholder="Specify the reason..."
                        value={deleteReason === 'Other' ? '' : deleteReason}
                        onChange={e => setDeleteReason(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteModal({ open: false, id: null, type: null, name: '' })}
                      className="flex-1 py-3 border border-gray-200 text-navy-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAdminDelete}
                      disabled={deleting || !deleteReason || !deleteReason.trim()}
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
      )}
    </div>
  )
}
