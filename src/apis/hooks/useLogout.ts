import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/routes/constants'
import { TOKEN_KEY } from '@/constants'
import apiClient from '../apiClient'

interface Response {
  success: boolean
}

const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  //NOTE - 쿼리 무효화
  const logout = async () => {
    queryClient.removeQueries({
      queryKey: ['/user'],
    })
    const response = await apiClient.post<Response>('/members/logout')

    return response.data
  }

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['/user'],
      })
      localStorage.removeItem(TOKEN_KEY)
      navigate(PATH.LOGIN)
    },
    //TODO - 로그아웃 실패 처리 추가 필요
  })
}

export default useLogout
