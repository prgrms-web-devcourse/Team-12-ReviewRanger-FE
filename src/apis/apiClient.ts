import axios from 'axios'
import { TOKEN_KEY } from '@/constants'

const apiClient = axios.create({
  baseURL: '',
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(TOKEN_KEY)
    if (accessToken) {
      config.headers.Authorization = accessToken
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default apiClient
