import { useState, useEffect, useRef } from 'react'
import { X, Shield, Send, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import api from '../../services/api'

export default function OtpVerificationModal({ isOpen, onClose, recordId, recordType, purpose, onSuccess, baseUrl }) {
  // baseUrl: 'customer/enquiries' or 'leads'
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [verified, setVerified] = useState(false)
  const inputRefs = useRef([])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', ''])
      setError('')
      setSuccess('')
      setOtpSent(false)
      setVerified(false)
      setResendCooldown(0)
    }
  }, [isOpen])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCooldown])

  // Auto-focus first input when OTP is sent
  useEffect(() => {
    if (otpSent && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [otpSent])

  const handleSendOtp = async () => {
    setSending(true)
    setError('')
    try {
      const url = baseUrl ? `/${baseUrl}/${recordId}/otp` : `/leads/${recordId}/otp`
      const res = await api.post(url, { purpose })
      setOtpSent(true)
      setSuccess(res.data.message || 'OTP sent successfully!')
      setResendCooldown(60) // 60 second cooldown
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.')
    }
    setSending(false)
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return
    setSending(true)
    setError('')
    try {
      const url2 = baseUrl ? `/${baseUrl}/${recordId}/otp` : `/leads/${recordId}/otp`
      const res = await api.post(url2, { purpose })
      setSuccess('OTP resent successfully!')
      setResendCooldown(60)
      setOtp(['', '', '', '', '', ''])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend OTP.')
    }
    setSending(false)
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Take last digit only
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-verify when all 6 digits are entered
    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      handleVerifyOtp(newOtp.join(''))
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted) {
      const newOtp = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
      setOtp(newOtp)
      // Focus last filled or next empty
      const nextEmpty = newOtp.findIndex(d => d === '')
      inputRefs.current[nextEmpty >= 0 ? nextEmpty : 5]?.focus()
      // Auto-verify if complete
      if (pasted.length === 6) {
        handleVerifyOtp(pasted)
      }
    }
  }

  const handleVerifyOtp = async (code) => {
    setLoading(true)
    setError('')
    try {
      const vUrl = baseUrl ? `/${baseUrl}/${recordId}/verify-otp` : `/leads/${recordId}/verify-otp`
      const res = await api.post(vUrl, { purpose, code: code || otp.join('') })
      setVerified(true)
      setSuccess(res.data.message || 'Verification successful!')
      // Notify parent after short delay
      setTimeout(() => {
        onSuccess?.(res.data)
        onClose?.()
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    }
    setLoading(false)
  }

  if (!isOpen) return null

  const purposeLabel = purpose === 'edit' ? 'Edit' : 'Delete'
  const purposeColor = purpose === 'edit' ? 'sky' : 'red'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className={`bg-${purposeColor}-50 px-6 py-4 border-b border-${purposeColor}-100`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-${purposeColor}-100 flex items-center justify-center`}>
                <Shield size={20} className={`text-${purposeColor}-600`} />
              </div>
              <div>
                <h3 className="font-bold text-navy-900">Verify Your Identity</h3>
                <p className="text-xs text-navy-500">OTP required to {purpose} this {recordType}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white rounded-lg transition-colors">
              <X size={18} className="text-navy-400" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {!otpSent ? (
            /* Send OTP Step */
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-navy-400" />
              </div>
              <h4 className="font-semibold text-navy-900 mb-2">Send Verification Code</h4>
              <p className="text-sm text-navy-500 mb-6">
                We'll send a 6-digit code to your registered email address to verify your identity before you can {purpose} this {recordType}.
              </p>
              <button
                onClick={handleSendOtp}
                disabled={sending}
                className={`w-full py-3 bg-${purposeColor}-600 text-white font-semibold rounded-xl hover:bg-${purposeColor}-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2`}
              >
                {sending ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send OTP Code</>
                )}
              </button>
            </div>
          ) : verified ? (
            /* Verified Success */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h4 className="font-bold text-green-700 text-lg mb-1">Verification Successful!</h4>
              <p className="text-sm text-navy-500">You can now {purpose} this {recordType}. Redirecting...</p>
            </div>
          ) : (
            /* Enter OTP Step */
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={24} className="text-green-500" />
                </div>
                <p className="text-sm text-navy-600">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    disabled={loading}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all disabled:bg-gray-50"
                  />
                ))}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success */}
              {success && !verified && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center gap-2 py-3 mb-4">
                  <Loader2 size={18} className="animate-spin text-sky-600" />
                  <span className="text-sm text-navy-600">Verifying...</span>
                </div>
              )}

              {/* Resend */}
              <div className="text-center">
                {resendCooldown > 0 ? (
                  <p className="text-sm text-navy-400 flex items-center justify-center gap-1">
                    <Clock size={14} />
                    Resend OTP in {resendCooldown}s
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={sending}
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Manual verify button */}
              <button
                onClick={() => handleVerifyOtp()}
                disabled={loading || otp.some(d => d === '')}
                className="w-full mt-4 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
