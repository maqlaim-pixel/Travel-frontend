import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'
import { tokenClaims, tokenExpiry, isTokenCurrent, isAdminRole } from '../utils/authSession'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('tv_token'))
  const [loading, setLoading] = useState(true)
  const logout = useCallback(() => {
    localStorage.removeItem('tv_token')
    localStorage.removeItem('tv_user')
    sessionStorage.removeItem('tv_otp')
    delete api.defaults.headers.common.Authorization
    setToken(null)
    setUser(null)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!token) { setLoading(false); return }
    let disposed = false
    const expire = () => {
      const admin = isAdminRole(tokenClaims(token)?.role)
      logout()
      window.location.replace(admin ? '/admin/login' : '/login')
    }
    if (!isTokenCurrent(token)) { expire(); return }
    const timer = setTimeout(expire, Math.min(tokenExpiry(token) - Date.now(), 2147483647))
    const checkExpiry = () => { if (!isTokenCurrent(token)) expire() }
    const syncSession = event => {
      if (event.key === 'tv_token') { setUser(null); setLoading(true); setToken(event.newValue) }
    }
    window.addEventListener('focus', checkExpiry)
    document.addEventListener('visibilitychange', checkExpiry)
    window.addEventListener('storage', syncSession)
    window.addEventListener('tv:unauthorized', expire)
    const endpoint = isAdminRole(tokenClaims(token)?.role) ? '/admin/me' : '/auth/me'
    api.get(endpoint).then(res => {
      if (!disposed && isTokenCurrent(token) && localStorage.getItem('tv_token') === token) setUser(res.data)
    }).catch(() => { if (!disposed) logout() })
      .finally(() => { if (!disposed) setLoading(false) })
    return () => {
      disposed = true
      clearTimeout(timer)
      window.removeEventListener('focus', checkExpiry)
      document.removeEventListener('visibilitychange', checkExpiry)
      window.removeEventListener('storage', syncSession)
      window.removeEventListener('tv:unauthorized', expire)
    }
  }, [token, logout])

  const storeSession = data => {
    if (!isTokenCurrent(data?.token) || !data?.user) throw new Error('Valid authentication session was not returned')
    localStorage.setItem('tv_token', data.token)
    localStorage.setItem('tv_user', JSON.stringify(data.user))
    sessionStorage.removeItem('tv_otp')
    setToken(data.token)
    setUser(data.user)
    return data.user
  }
  const challenge = data => {
    if (!(data?.requiresOtp || data?.otpRequired) || !data.transactionId || !['REGISTRATION', 'LOGIN'].includes(data.purpose))
      throw new Error('OTP challenge was not returned. Please try again.')
    const context = { ...data, requestedAt: Date.now() }
    sessionStorage.setItem('tv_otp', JSON.stringify(context))
    return context
  }
  const login = async (email, password) => challenge((await api.post('/auth/login', { email, password })).data)
  const adminLogin = async (email, password) => storeSession((await api.post('/admin/login', { email, password })).data)
  const register = async (name, email, phone, password, confirmPassword) => {
    const payload = { name, email, phone, password, confirmPassword }
    if (import.meta.env.DEV) console.log('[TravelVista DEV] register fields:', Object.keys(payload))
    return challenge((await api.post('/auth/register', payload)).data)
  }
  const verifyRegistration = async (email, otp, transactionId) => storeSession((await api.post('/auth/register/verify', { email, otp, transactionId })).data)
  const verifyLoginOtp = async ({ email, otp, transactionId }) => storeSession((await api.post('/auth/login/verify', { email, otp, transactionId })).data)
  const resendRegistration = async email => challenge((await api.post('/auth/register/resend', { email })).data)
  const resendLoginOtp = async (email, transactionId) => challenge((await api.post('/auth/login/otp/resend', { email, transactionId })).data)
  const isAdmin = isAdminRole(user?.role)
  return <AuthContext.Provider value={{ user, token, loading, login, customerLogin: login, adminLogin,
    register, verifyRegistration, verifyRegistrationOtp: verifyRegistration, verifyLoginOtp,
    resendRegistration, resendLoginOtp, logout, isAdmin, isCustomer: user?.role === 'customer' }}>{children}</AuthContext.Provider>
}
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
