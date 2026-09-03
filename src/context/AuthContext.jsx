import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('tv_token'))
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async (tkn) => {
    if (tkn) {
      try {
        // Try admin endpoint first, then customer
        let res
        try {
          res = await api.get('/admin/me')
        } catch {
          res = await api.get('/auth/me')
        }
        setUser(res.data)
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      loadUser(token)
    } else {
      setLoading(false)
    }
  }, [token, loadUser])

  const login = async (email, password) => {
    const res = await api.post('/admin/login', { email, password })
    const { token: newToken, user: userData } = res.data
    localStorage.setItem('tv_token', newToken)
    localStorage.setItem('tv_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return userData
  }

  const customerLogin = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: userData } = res.data
    localStorage.setItem('tv_token', newToken)
    localStorage.setItem('tv_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return userData
  }

  const register = async (name, email, phone, password) => {
    const res = await api.post('/auth/register', { name, email, phone, password })
    const { token: newToken, user: userData } = res.data
    localStorage.setItem('tv_token', newToken)
    localStorage.setItem('tv_user', JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return userData
  }

  const logout = () => {
    localStorage.removeItem('tv_token')
    localStorage.removeItem('tv_user')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }

  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin' || user?.role === 'content_manager'
  const isCustomer = !!user && !isAdmin

  return (
    <AuthContext.Provider value={{ user, token, loading, login, customerLogin, register, logout, isAdmin, isCustomer }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
