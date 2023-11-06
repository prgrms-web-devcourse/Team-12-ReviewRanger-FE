import { useLocalStorage } from '@/hooks'
import { useLogin } from '@/apis/hooks'
import { LoginGroup, LogoGroup } from './components'

export interface LoginProps {
  email: string
  password: string
}

const LoginPage = () => {
  const [user, setUser] = useLocalStorage('user')
  const { mutate: login } = useLogin()

  const handleLoginButtonClick = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess({ data }) {
          setUser(data)
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
