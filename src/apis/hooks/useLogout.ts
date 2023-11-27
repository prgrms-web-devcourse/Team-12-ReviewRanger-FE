import { useQueryClient, useMutation } from '@tanstack/react-query'
import { TOKEN_KEY } from '@/constants'
import apiClient from '../apiClient'

interface Response {
  success: boolean
}

const useLogout = () => {
  const queryClient = useQueryClient()
  const logout = async () => {
    const response = await apiClient.post<Response>('/members/logout')

    return response.data
  }

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem(TOKEN_KEY)
      queryClient.removeQueries({
        queryKey: ['reviews'],
      })
      queryClient.removeQueries({
        queryKey: ['/user'],
      })
    },
    //TODO - 로그아웃 실패 처리 추가 필요
  })
}

export default useLogout
