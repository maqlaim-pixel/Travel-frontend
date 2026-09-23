// Shared helpers for OTP flows: friendly error mapping + light validation.
// The backend remains the source of truth for rate limits and OTP rules —
// these are UX-only helpers.

const GENERIC = 'Something went wrong. Please try again.'
const NETWORK = "Can't reach the server. Check your connection and try again."
const SEND_FAILED = "We couldn't send the code right now. Please try again in a bit."
const SERVER = 'Something went wrong on our side. Please try again shortly.'

/**
 * Map a backend/axios error to a user-friendly message.
 * Never surfaces stack traces, provider names, or credentials.
 */
export function getOtpErrorMessage(err) {
  if (!err) return GENERIC

  // Network-level failure (no HTTP response at all)
  if (err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED' || (!err.response && err.request)) {
    return NETWORK
  }

  const status = err.response?.status
  const raw = (err.response?.data?.error || err.response?.data?.message || '').trim()
  if (status === 502) return /restricted by the provider/i.test(raw)
    ? 'Email delivery is restricted by the provider. Please contact support to enable this recipient.'
    : 'Unable to send OTP email. Please try again or contact support.'

  // Timeouts / cooldown / rate limits
  if (/wait \d+s|please wait/i.test(raw)) {
    const secs = raw.match(/\d+/)?.[0]
    return secs
      ? `Please wait ${secs}s before requesting another code.`
      : 'Please wait a moment before requesting another code.'
  }
  if (/too many/i.test(raw)) {
    return 'Too many attempts. Please request a new code in a little while.'
  }

  // OTP state
  if (/invalid or expired/i.test(raw)) return 'Invalid or expired code. Please try again.'
  if (/expired/i.test(raw)) return 'This code has expired. Please request a new one.'

  // Known-friendly backend messages pass through untouched
  if (/no account found|email is required|phone( number)? is required|otp( code)? is required|password (is required|must be)/i.test(raw)) {
    return raw
  }

  // Configuration/delivery problems. Keep provider credentials and internal
  // details out of the browser while making the local setup problem clear.
  if (/not configured|unavailable.*configure|configure.*resend|failed to send|could not send|resend rejected|email otp/i.test(raw) || (status === 500 && /send/i.test(raw))) {
    return /resend|email otp|email service/i.test(raw)
      ? 'Email OTP is unavailable. Configure RESEND_API_KEY and the Resend sender email on the backend.'
      : SEND_FAILED
  }

  if (status === 401) return raw || 'Invalid credentials.'
  if (status === 403) return raw || 'You are not allowed to perform this action.'
  if (status >= 500) return SERVER

  // Any other 4xx with a sane backend message: pass it through if short and clean
  if (raw && raw.length <= 120 && !/[{}<>]|exception|at [a-z]+\./i.test(raw)) {
    return raw
  }
  return GENERIC
}

/** Loose-but-sane email check for client-side validation. */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || '').trim())
}

/**
 * Phone digit-count validation per selected country code.
 * Returns an error message or null when valid.
 */
export function validatePhoneDigits(digits, countryCode) {
  if (!digits) return 'Please enter your phone number'
  const expected = { '+91': 10, '+1': 10, '+44': 10 }[countryCode]
  if (expected && digits.length !== expected) {
    return `Please enter a valid ${expected}-digit phone number`
  }
  if (digits.length < 7) return 'Please enter a valid phone number'
  return null
}
