import axios from 'axios'
import { useToast } from '@/hooks'
import { useLogout } from '@/apis/hooks'
import { TOKEN_KEY } from '@/constants'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(TOKEN_KEY)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          {
            const { addToast } = useToast()
            addToast({
              message: '유효하지 않은 인증입니다! 다시 로그인을 해주세요!',
              type: 'error',
            })
            const { mutate: logOut } = useLogout()
            logOut()
          }
          break
        default:
          return Promise.reject(error)
      }
    }
  },
)

export default apiClient
