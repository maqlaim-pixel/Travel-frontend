import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User, Package, Heart, Clock, LogOut, Mail, Phone, Edit2 } from 'lucide-react'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('profile')

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center border-2 border-sky-400">
              <User size={28} className="text-sky-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-sky-200 text-sm">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-sky-500/20 text-sky-300 text-xs rounded-full capitalize">
                {user.role || 'customer'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border overflow-hidden">
              <nav className="divide-y">
                {[
                  { key: 'profile', icon: User, label: 'My Profile' },
                  { key: 'bookings', icon: Package, label: 'My Bookings' },
                  { key: 'wishlist', icon: Heart, label: 'Wishlist' },
                  { key: 'recent', icon: Clock, label: 'Recently Viewed' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setTab(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      tab === item.key ? 'bg-sky-50 text-sky-700 font-medium' : 'text-navy-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                ))}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {tab === 'profile' && (
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-navy-900">Profile Information</h2>
                  <button className="flex items-center gap-1 text-sm text-sky-600 hover:underline">
                    <Edit2 size={14} /> Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 py-3 border-b">
                    <User size={18} className="text-navy-400" />
                    <div>
                      <div className="text-xs text-navy-400">Full Name</div>
                      <div className="text-navy-800 font-medium">{user.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-3 border-b">
                    <Mail size={18} className="text-navy-400" />
                    <div>
                      <div className="text-xs text-navy-400">Email</div>
                      <div className="text-navy-800 font-medium">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 py-3">
                    <Phone size={18} className="text-navy-400" />
                    <div>
                      <div className="text-xs text-navy-400">Phone</div>
                      <div className="text-navy-800 font-medium">{user.phone || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'bookings' && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold text-navy-900 mb-4">My Bookings</h2>
                <div className="text-center py-12 text-navy-400">
                  <Package size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No bookings yet</p>
                  <p className="text-sm mt-1">Start exploring packages and book your dream trip!</p>
                  <Link to="/packages" className="inline-block mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
                    Browse Packages
                  </Link>
                </div>
              </div>
            )}

            {tab === 'wishlist' && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold text-navy-900 mb-4">My Wishlist</h2>
                <div className="text-center py-12 text-navy-400">
                  <Heart size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No saved trips</p>
                  <p className="text-sm mt-1">Save packages you love to view them later.</p>
                  <Link to="/packages" className="inline-block mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
                    Explore Packages
                  </Link>
                </div>
              </div>
            )}

            {tab === 'recent' && (
              <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-bold text-navy-900 mb-4">Recently Viewed</h2>
                <div className="text-center py-12 text-navy-400">
                  <Clock size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No recent activity</p>
                  <p className="text-sm mt-1">Packages you view will appear here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
