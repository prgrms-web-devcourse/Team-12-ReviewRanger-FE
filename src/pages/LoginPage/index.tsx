import { useRef } from 'react'
import { useLocalStorage } from '@/hooks'
import { useLogin } from '@/apis/hooks'
import { LoginGroup, LogoGroup } from './components'

export interface LoginProps {
  email: string
  password: string
}

interface User {
  name: string
  email: string
}
const LoginPage = () => {
  const loginGroup = useRef<{ getValues: () => LoginProps } | null>(null)

  const [user, setUser] = useLocalStorage<User>('user')
  const { mutate: login } = useLogin()

  const handleLoginButtonClick = () => {
    if (loginGroup.current?.getValues) {
      const { email, password } = loginGroup.current.getValues()
      login(
        { email, password },
        {
          onSuccess: ({ data }) => {
            setUser(data)

            console.log(user)
          },
        },
      )
    }
  }

  return (
    <div className="w-50% flex h-full flex-col items-center gap-4 bg-main-ivory dark:bg-main-red-100">
      <LogoGroup />
      <LoginGroup ref={loginGroup} handleLogin={handleLoginButtonClick} />
    </div>
  )
}
export default LoginPage
