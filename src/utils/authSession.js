export function tokenClaims(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(payload))
  } catch { return null }
}

export function tokenExpiry(token) {
  const exp = tokenClaims(token)?.exp
  return typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 : 0
}

export function isTokenCurrent(token, now = Date.now()) {
  return tokenExpiry(token) > now
}

export const isAdminRole = role => ['super_admin', 'admin', 'content_manager', 'editor'].includes(role)
