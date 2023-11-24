import { useNavigate } from 'react-router-dom'
import { Header } from '@/components'
import { useLogin, useUser } from '@/apis/hooks'
import useToast from '@/hooks/useToast'
import { LoginGroup, LogoGroup } from './components'

export interface LoginProps {
  email: string
  password: string
}

const LoginPage = () => {
  const { refetch } = useUser()
  const { mutate: login } = useLogin()
  const { addToast } = useToast()

  const navigate = useNavigate()

  const handleLoginButtonClick = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess() {
          refetch()
          navigate('/')
        },
        onError(data) {
          addToast({ message: data.message, type: 'error' })
        },
      },
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-main-ivory px-5 dark:bg-main-red-100 md:px-64">
        <div className="items-around flex h-full flex-col gap-14 pt-14">
          <div className="flex flex-col items-center justify-center">
            <LogoGroup />
          </div>
          <LoginGroup handleLogin={handleLoginButtonClick} />
        </div>
      </div>
    </div>
  )
}
export default LoginPage
