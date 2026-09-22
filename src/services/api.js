// import axios from 'axios'
//
// if (import.meta.env.DEV) {
//   console.log('[TravelVista DEV] ACTIVE FRONTEND - Railway API configuration')
//   console.log('[TravelVista DEV] API base:', '/api')
// }
//
// const api = axios.create({
//   baseURL: '/api',
//   timeout: 45000,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// })
//
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('tv_token')
//
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//
//   // Let the browser/Axios set the multipart boundary for file uploads.
//   // The JSON default must not be sent with FormData requests.
//   if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
//     delete config.headers['Content-Type']
//     delete config.headers['content-type']
//   }
//
//   return config
// })
//
// api.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response?.status === 401 && error.config?.headers?.Authorization &&
//           error.config.headers.Authorization === `Bearer ${localStorage.getItem('tv_token')}` &&
//           !/^\/auth\/(login|register)/.test(error.config.url) && error.config.url !== '/admin/login') {
//         window.dispatchEvent(new Event('tv:unauthorized'))
//       }
//
//       return Promise.reject(error)
//     }
// )
//
// export default api


import axios from 'axios'

const configuredApiUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')
const API_BASE_URL = import.meta.env.DEV
    ? '/api'
    : configuredApiUrl.endsWith('/api')
      ? configuredApiUrl
      : `${configuredApiUrl}/api`

if (import.meta.env.PROD) {
  console.log('[TravelVista PROD API]', API_BASE_URL)
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('tv_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (
      typeof FormData !== 'undefined' &&
      config.data instanceof FormData
  ) {
    delete config.headers['Content-Type']
    delete config.headers['content-type']
  }

  return config
})

api.interceptors.response.use(
    response => response,
    error => {
      if (
          error.response?.status === 401 &&
          error.config?.headers?.Authorization &&
          error.config.headers.Authorization ===
          `Bearer ${localStorage.getItem('tv_token')}` &&
          !/^\/auth\/(login|register)/.test(error.config.url) &&
          error.config.url !== '/admin/login'
      ) {
        window.dispatchEvent(new Event('tv:unauthorized'))
      }

      return Promise.reject(error)
    }
)

export default api