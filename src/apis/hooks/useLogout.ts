import { useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'

interface Response {
  success: boolean
}

const useLogout = () => {
  const logout = async (): Promise<Response> => {
    const response = await apiClient.get('/members/logout')

    return response.data
  }

  return useQuery({
    queryKey: ['/members/logout'],
    queryFn: logout,
  })
}

export default useLogout
