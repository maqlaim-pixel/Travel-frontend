import { useState, useEffect } from 'react'
import { Heart, Users, Package, MapPin, Loader2, RefreshCw, ChevronDown, ChevronUp, Phone, Mail, Eye, Star } from 'lucide-react'
import api from '../../services/api'

export default function AdminClientInterests() {
  const [interests, setInterests] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('clients') // clients | popular
  const [expandedClient, setExpandedClient] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const [search, setSearch] = useState('')

  const fetchInterests = async () => {
    setLoading(true)
    try {
      const [interestsRes, summaryRes] = await Promise.all([
        api.get('/admin/wishlists'),
        api.get('/admin/wishlists/interests/summary')
      ])
      setInterests(Array.isArray(interestsRes.data) ? interestsRes.data : [])
      setSummary(summaryRes.data)
    } catch (err) {
      console.error('Failed to fetch client interests:', err)
      setInterests([])
    }
    setLoading(false)
  }

  useEffect(() => { fetchInterests() }, [])

  const fetchClientDetail = async (userId) => {
    try {
      const res = await api.get(`/admin/wishlists/user/${userId}`)
      setSelectedClient(res.data)
    } catch (err) {
      console.error('Failed to fetch client detail:', err)
    }
  }

  const filteredClients = interests.filter(c =>
    !search ||
    (c.userName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.userEmail || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.interestedDestinations || []).some(d => d.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
            <Heart size={24} className="text-red-500" />
            Client Interests
          </h1>
          <p className="text-sm text-navy-500 mt-1">
            See what packages clients are saving to their wishlist — use this to create personalized recommendations
          </p>
        </div>
        <button onClick={fetchInterests} className="p-2 rounded-lg hover:bg-gray-100" title="Refresh">
          <RefreshCw size={16} className="text-navy-500" />
        </button>
      </div>

      {/* Stats Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{summary.totalWishlists || 0}</p>
                <p className="text-xs text-navy-500">Total Wishlists</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{summary.uniqueClients || 0}</p>
                <p className="text-xs text-navy-500">Active Clients</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Package size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">{summary.uniquePackages || 0}</p>
                <p className="text-xs text-navy-500">Unique Packages Saved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Star size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-900">
                  {summary.packages?.length > 0 ? summary.packages[0]?.wishlistCount || 0 : 0}
                </p>
                <p className="text-xs text-navy-500">Most Popular</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => { setActiveTab('clients'); setSelectedClient(null) }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'clients' ? 'bg-white text-sky-600 shadow-sm' : 'text-navy-600 hover:text-navy-800'
          }`}
        >
          By Client ({interests.length})
        </button>
        <button
          onClick={() => { setActiveTab('popular'); setSelectedClient(null) }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'popular' ? 'bg-white text-sky-600 shadow-sm' : 'text-navy-600 hover:text-navy-800'
          }`}
        >
          Most Popular ({summary?.packages?.length || 0})
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search by client name, email, or destination..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-sky-600" />
        </div>
      ) : activeTab === 'clients' ? (
        /* ── BY CLIENT ── */
        <div className="space-y-3">
          {filteredClients.length === 0 ? (
            <div className="bg-white rounded-xl border p-12 text-center">
              <Heart size={40} className="mx-auto text-navy-300 mb-3" />
              <p className="text-navy-500">No client wishlists yet</p>
              <p className="text-sm text-navy-400 mt-1">When clients add packages to their wishlist, you'll see them here</p>
            </div>
          ) : (
            filteredClients.map(client => (
              <div key={client.userId} className="bg-white rounded-xl border overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    const key = `client-${client.userId}`
                    const isExpanding = expandedClient !== key
                    setExpandedClient(isExpanding ? key : null)
                    if (isExpanding) fetchClientDetail(client.userId)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {(client.userName || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{client.userName}</p>
                      <p className="text-xs text-navy-500">
                        {client.userEmail}
                        {client.userPhone && ` · ${client.userPhone}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold">
                        <Heart size={14} /> {client.wishlistCount}
                      </span>
                    </div>
                    {expandedClient === `client-${client.userId}` ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {expandedClient === `client-${client.userId}` && selectedClient && (
                  <div className="border-t p-4 bg-gray-50">
                    {/* Interest Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {client.interestedDestinations?.map(d => (
                        <span key={d} className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">
                          <MapPin size={12} /> {d}
                        </span>
                      ))}
                      {client.interestedCategories?.map(c => (
                        <span key={c} className="inline-flex items-center px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {c}
                        </span>
                      ))}
                      {client.interestedStates?.map(s => (
                        <span key={s} className="inline-flex items-center px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Package Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedClient.packages?.map(pkg => (
                        <div key={pkg.wishlistId} className="bg-white rounded-lg border p-3 flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            {pkg.coverImage ? (
                              <img src={pkg.coverImage} alt={pkg.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={20} className="text-navy-300" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-navy-900 truncate">{pkg.title}</p>
                            <p className="text-xs text-navy-500">{pkg.destination} · {pkg.state}</p>
                            <p className="text-xs font-bold text-sky-600 mt-1">
                              {pkg.startingPrice ? `₹${Number(pkg.startingPrice).toLocaleString()}` : 'Price TBD'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <a
                        href={`mailto:${client.userEmail}?subject=Travel Recommendations Based on Your Wishlist&body=Hi ${client.userName},%0D%0A%0D%0AI noticed you saved some packages in your wishlist. Here are some personalized recommendations for you...`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
                      >
                        <Mail size={14} /> Send Email
                      </a>
                      {client.userPhone && (
                        <a
                          href={`https://wa.me/${client.userPhone.replace(/[^0-9]/g, '')}?text=Hi ${client.userName}, we have exciting travel offers based on your interests!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          <Phone size={14} /> WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        /* ── MOST POPULAR ── */
        <div className="space-y-3">
          {!summary?.packages?.length ? (
            <div className="bg-white rounded-xl border p-12 text-center">
              <Package size={40} className="mx-auto text-navy-300 mb-3" />
              <p className="text-navy-500">No wishlist data yet</p>
            </div>
          ) : (
            summary.packages.map((pkg, idx) => (
              <div key={pkg.packageId} className="bg-white rounded-xl border p-4 flex items-center gap-4">
                <div className="text-2xl font-bold text-navy-300 w-8 text-center">#{idx + 1}</div>
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                  {pkg.coverImage ? (
                    <img src={pkg.coverImage} alt={pkg.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={20} className="text-navy-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900">{pkg.title}</p>
                  <p className="text-xs text-navy-500">
                    {pkg.destination} · {pkg.state} · {pkg.category}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold">
                    <Heart size={14} /> {pkg.wishlistCount}
                  </span>
                  <p className="text-xs text-navy-400 mt-1">
                    {pkg.startingPrice ? `₹${Number(pkg.startingPrice).toLocaleString()}` : ''}
                  </p>
                </div>
                <div className="shrink-0">
                  <p className="text-xs text-navy-500 mb-1">{pkg.interestedUsers?.length || 0} clients</p>
                  <div className="flex -space-x-2">
                    {pkg.interestedUsers?.slice(0, 5).map((u, i) => (
                      <div key={i} className="w-6 h-6 bg-sky-400 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                        {(u.userName || 'U').charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
