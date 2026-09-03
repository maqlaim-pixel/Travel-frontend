import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from 'lucide-react'
import api from '../../services/api'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    navigate(user.role === 'super_admin' || user.role === 'admin' ? '/admin' : '/account')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      await register(form.name, form.email, form.phone, form.password)
      navigate('/account')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">TV</span>
            </div>
          </Link>
          <h1 className="text-2xl font-display font-bold text-navy-900">Create Account</h1>
          <p className="text-navy-500 mt-1">Join TravelVista and start exploring</p>
        </div>

        <div className="bg-white rounded-xl border p-8">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Full Name</label>
              <div className="relative"><User size={18} className="absolute left-3 top-3.5 text-navy-400" />
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" required /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Email</label>
              <div className="relative"><Mail size={18} className="absolute left-3 top-3.5 text-navy-400" />
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" required /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Phone</label>
              <div className="relative"><Phone size={18} className="absolute left-3 top-3.5 text-navy-400" />
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Password</label>
              <div className="relative"><Lock size={18} className="absolute left-3 top-3.5 text-navy-400" />
              <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Min 6 characters"
                className="w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-navy-400">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1">Confirm Password</label>
              <div className="relative"><Lock size={18} className="absolute left-3 top-3.5 text-navy-400" />
              <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none" required /></div>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
              <UserPlus size={18} /> {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-navy-500 mt-6">
            Already have an account? <Link to="/login" className="text-sky-600 font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
