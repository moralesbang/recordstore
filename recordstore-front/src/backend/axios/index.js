import axios from 'axios'
import { includes } from 'ramda/src/includes'

const API_URL = 'http://localhost:3000'

const defaultConfig = {
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

const plainAxiosInstance = axios.create(defaultConfig)
const securedAxiosInstance = axios.create(defaultConfig)

securedAxiosInstance.interceptors.request.use((config) => {
  const method = config.method.toUpperCase()
  if (includes(method, ['GET', 'OPTIONS'])) {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, async (error) => {
  if (error.response && error.response.config && error.response.status === 401) {
    try {
      const response = await plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      let retryConfig = error.response.config
      retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
      return plainAxiosInstance.request(retryConfig)
    } catch (error) {
      delete localStorage.csrf
      delete localStorage.signedIn
      location.replace('/')
      return Promise.reject(error)
    }
  } else {
    return Promise.reject(error)
  }
})

export { securedAxiosInstance, plainAxiosInstance }
