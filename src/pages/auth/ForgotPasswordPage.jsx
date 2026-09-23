import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, KeyRound, ArrowLeft, Clock, Loader2, ShieldCheck, Send, CheckCircle } from 'lucide-react'
import api from '../../services/api'
import { getOtpErrorMessage, isValidEmail } from '../../utils/otpErrors'

// Request OTP → Enter/verify OTP → Reset password.
// The OTP must be verified before the reset step unlocks; the backend
// independently enforces this (it rejects resets without a verified OTP).
export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1) // 1 request | 2 verify | 3 reset | 4 done
  const [email, setEmail] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpVerified, setOtpVerified] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef([])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown(p => p - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) inputRefs.current[0].focus()
  }, [step])

  const handleRequest = async (e) => {
    e?.preventDefault()
    setError('')
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/auth/forgot-password', { email: email.trim().toLowerCase() })
      setInfo(res.data?.message || 'If an account exists for this email, an OTP has been sent.')
      setTransactionId(res.data?.transactionId || '')
      setResendCooldown(60)
      setStep(2)
    } catch (err) {
      setError(getOtpErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/auth/forgot-password', { email: email.trim().toLowerCase() })
      setTransactionId(res.data?.transactionId || '')
      setOtp(['', '', '', '', '', ''])
      setInfo('A new code has been sent.')
      setResendCooldown(60)
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError(getOtpErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    setError('')
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      const next = [...otp]
      next[index - 1] = ''
      setOtp(next)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) setOtp(pasted.split('').concat(Array(6).fill('')).slice(0, 6))
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }
    setError('')
    setVerifying(true)
    try {
      await api.post('/auth/forgot-password/verify', { email: email.trim().toLowerCase(), otp: code, transactionId })
      setOtpVerified(true)
      setInfo('Code verified. Choose a new password.')
      setStep(3)
    } catch (err) {
      setError(getOtpErrorMessage(err))
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setVerifying(false)
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    setError('')
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (newPassword !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await api.post('/auth/reset-password', {
        email: email.trim().toLowerCase(),
        otp: otp.join(''),
        newPassword,
        transactionId,
      })
      setStep(4)
    } catch (err) {
      // A rejected reset (e.g. OTP burned/expired server-side) sends the user
      // back to verification — the reset step cannot be reached without it.
      setError(getOtpErrorMessage(err))
      if (/verif|otp/i.test(getOtpErrorMessage(err))) {
        setOtpVerified(false)
        setStep(2)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">TV</span>
            </div>
          </Link>
          <h1 className="text-2xl font-display font-bold text-navy-900">Reset Password</h1>
          <p className="text-navy-500 mt-1">We'll email you a verification code</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border p-8">
          {/* Error / info banners */}
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6">{error}</div>}
          {info && !error && <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-6">{info}</div>}

          {/* ── Step 1: request OTP ── */}
          {step === 1 && (
            <form onSubmit={handleRequest} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-navy-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Reset Code</>}
              </button>
              <p className="text-center text-sm text-navy-500">
                Remembered it? <Link to="/login" className="text-sky-600 font-medium hover:underline">Back to Sign In</Link>
              </p>
            </form>
          )}

          {/* ── Step 2: verify OTP ── */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck size={24} className="text-sky-600" />
                </div>
                <p className="text-sm text-navy-600">Enter the 6-digit code sent to</p>
                <p className="text-sm font-semibold text-navy-900 mt-0.5 break-all">{email}</p>
              </div>

              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    disabled={verifying}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all disabled:bg-gray-50"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-sm mb-2">
                <button
                  type="button"
                  onClick={() => { setStep(1); setError(''); setInfo('') }}
                  className="text-navy-400 hover:text-navy-600 font-medium flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Change email
                </button>
                {resendCooldown > 0 ? (
                  <span className="text-navy-400 flex items-center gap-1"><Clock size={14} /> Resend in {resendCooldown}s</span>
                ) : (
                  <button type="button" onClick={handleResend} disabled={loading} className="text-sky-600 hover:text-sky-700 font-medium">
                    Resend code
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleVerify}
                disabled={verifying || otp.some((d) => d === '')}
                className="w-full mt-2 btn-primary flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {verifying ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : <><KeyRound size={18} /> Verify Code</>}
              </button>
            </div>
          )}

          {/* ── Step 3: new password (only reachable after verification) ── */}
          {step === 3 && otpVerified && (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-navy-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-12 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3.5 text-navy-400">
                    {showPw ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-navy-400" />
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Resetting...</> : <><CheckCircle size={18} /> Reset Password</>}
              </button>
            </form>
          )}

          {/* ── Step 4: done ── */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-green-700 text-lg mb-1">Password updated!</h3>
              <p className="text-sm text-navy-500 mb-6">You can now sign in with your new password.</p>
              <Link to="/login" className="w-full btn-primary inline-flex items-center justify-center gap-2">
                <KeyRound size={18} /> Go to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
