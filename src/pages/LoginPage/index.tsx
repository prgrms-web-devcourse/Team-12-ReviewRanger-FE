import { useRef } from 'react'
import { useLogin } from '@/apis/hooks'
import { LoginGroup } from './components'

export interface LoginProps {
  email: string
  password: string
}

const LoginPage = () => {
  const loginGroup = useRef<{ getValues: () => LoginProps } | null>(null)

  const { mutate: login } = useLogin()

  const handleLoginButtonClick = () => {
    if (loginGroup.current?.getValues) {
      const { email, password } = loginGroup.current.getValues()
      login({ email, password })
    }
  }

  return <LoginGroup ref={loginGroup} handleLogin={handleLoginButtonClick} />
}
export default LoginPage
