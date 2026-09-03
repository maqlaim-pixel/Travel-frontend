import { useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle, Eye, MessageSquare, FileText } from 'lucide-react'

const APPROVALS = [
  { id: 1, type: 'Package', title: 'Maldives Luxury Resort Package', createdBy: 'Editor Team', submitted: '2 hours ago', status: 'pending_review', comments: '' },
  { id: 2, type: 'Blog', title: 'Best Time to Visit Ladakh: Complete Guide', createdBy: 'Priya Sharma', submitted: '5 hours ago', status: 'pending_review', comments: '' },
  { id: 3, type: 'Destination', title: 'Sri Lanka Travel Guide', created: 'Content Team', submitted: '1 day ago', status: 'changes_requested', comments: 'Need more images and updated pricing.' },
  { id: 4, type: 'Activity', title: 'Bungee Jumping in Rishikesh', createdBy: 'Adventure Team', submitted: '2 days ago', status: 'approved', comments: 'Approved with updated safety guidelines.' },
]

const STATUS_CONFIG = {
  pending_review: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100 text-yellow-700', label: 'Pending Review' },
  changes_requested: { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-100 text-orange-700', label: 'Changes Requested' },
  approved: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 text-green-700', label: 'Approved' },
  rejected: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100 text-red-700', label: 'Rejected' },
}

export default function AdminApprovalCenter() {
  const [filter, setFilter] = useState('all')

  const filtered = APPROVALS.filter(a => filter === 'all' || a.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Approval Center</h1>
        <div className="flex gap-2">
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            {APPROVALS.filter(a => a.status === 'pending_review').length} Pending
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending_review', 'changes_requested', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-sky-600 text-white' : 'bg-white text-navy-600 border hover:bg-navy-50'
            }`}>
            {f === 'all' ? 'All' : f.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(item => {
          const config = STATUS_CONFIG[item.status]
          const Icon = config.icon
          return (
            <div key={item.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge-blue">{item.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg}`}>{config.label}</span>
                    </div>
                    <h3 className="font-bold text-navy-900">{item.title}</h3>
                    <p className="text-sm text-navy-500 mt-1">By {item.createdBy} · Submitted {item.submitted}</p>
                    {item.comments && <p className="text-sm text-orange-600 mt-2 italic">"{item.comments}"</p>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="btn-secondary text-xs !px-3 !py-1.5 flex items-center gap-1"><Eye size={12} /> View</button>
                  {item.status === 'pending_review' && (
                    <>
                      <button className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-green-700 flex items-center gap-1"><CheckCircle size={12} /> Approve</button>
                      <button className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-red-700 flex items-center gap-1"><XCircle size={12} /> Reject</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
