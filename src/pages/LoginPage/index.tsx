import { useLogin } from '@/apis/hooks'
import { LoginGroup, LogoGroup } from './components'

export interface LoginProps {
  email: string
  password: string
}

const LoginPage = () => {
  const { mutate: login } = useLogin()

  const handleLoginButtonClick = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess({ data }) {
          localStorage.setItem('user', JSON.stringify(data))
        },
      },
    )
  }

  return (
    <div className="flex h-full flex-col items-center gap-4 bg-main-ivory px-5 dark:bg-main-red-100 md:px-64">
      <LogoGroup />
      <LoginGroup handleLogin={handleLoginButtonClick} />
    </div>
  )
}
export default LoginPage
