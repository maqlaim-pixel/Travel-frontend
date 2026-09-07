import api from '../services/api'

/**
 * Backend origin derived from the Axios baseURL.
 *
 * Example:
 *   baseURL: https://backend-travel-production-dd2c.up.railway.app/api
 *   origin:  https://backend-travel-production-dd2c.up.railway.app
 */
const API_ORIGIN = (api.defaults.baseURL || '')
    .replace(/\/api\/?$/, '')
    .replace(/\/+$/, '')

/**
 * Pull a URL string out of a value that may be:
 *   - a plain URL string
 *   - an object like { url } / { imageUrl } / { path } / { filename } / { image }
 */
function extractUrl(value) {
  if (!value) return ''

  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'object') {
    const candidate =
        value.url ||
        value.imageUrl ||
        value.path ||
        value.fileUrl ||
        value.filename ||
        value.image ||
        ''
    return typeof candidate === 'string' ? candidate.trim() : ''
  }

  return ''
}

/**
 * Convert any image reference into a URL the browser can load directly.
 *
 * - Absolute https://… URLs (e.g. Cloudinary) are returned unchanged.
 * - Backend-relative paths (/api/images/…) are prefixed with the backend
 *   origin so they never resolve against the frontend host.
 * - Bare filenames are treated as backend-uploaded files.
 */
export function resolveImageUrl(value) {
  const raw = extractUrl(value)
  if (!raw) return ''

  // Already absolute — Cloudinary / Unsplash / blob etc.
  if (/^(https?:|blob:|data:)/i.test(raw)) {
    return raw
  }

  // Backend-relative path (e.g. legacy /api/images/xxxx.jpg)
  if (raw.startsWith('/')) {
    return `${API_ORIGIN}${raw}`
  }

  // Bare filename
  return `${API_ORIGIN}/api/images/${raw}`
}

/**
 * Parse destination.heroImages (or any image list field) into an array of
 * absolute, loadable image URLs. Tolerant of every format seen in the DB:
 *
 *   1. Comma-separated URLs      -> "a.jpg, b.jpg"
 *   2. Single URL string         -> "https://…/x.png"
 *   3. JSON array of URL strings -> '["a.jpg","b.jpg"]'
 *   4. JSON array of objects     -> '[{"url":"a.jpg"}]'
 *   5. Already an array          -> ['a.jpg']
 *
 * Empty/blank input returns []. Duplicates are removed.
 */
export function parseImageList(value) {
  if (value == null || value === '') return []

  let entries = []

  if (Array.isArray(value)) {
    entries = value
  } else if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return []

    // JSON array (or a JSON-encoded single string) — the format the CMS
    // entity documents. Fall back to comma splitting if not valid JSON.
    if (trimmed.startsWith('[') || trimmed.startsWith('"')) {
      try {
        const parsed = JSON.parse(trimmed)
        if (Array.isArray(parsed)) {
          entries = parsed
        } else if (typeof parsed === 'string') {
          entries = [parsed]
        }
      } catch (e) {
        // Not JSON — handled below
      }
    }

    if (entries.length === 0) {
      entries = trimmed.split(',')
    }
  } else {
    return []
  }

  const urls = []
  for (const item of entries) {
    const url = resolveImageUrl(item)
    if (url && !urls.includes(url)) {
      urls.push(url)
    }
  }
  return urls
}
