import { useNavigate } from 'react-router-dom'
import { Header } from '@/components'
import { useLogin } from '@/apis/hooks'
import { TOKEN_KEY } from '@/constants'
import { LoginGroup, LogoGroup } from './components'

export interface LoginProps {
  email: string
  password: string
}

const LoginPage = () => {
  const { mutate: login } = useLogin()
  const navigate = useNavigate()

  const handleLoginButtonClick = (email: string, password: string) => {
    login(
      { email, password },
      {
        //TODO - 로그인 성공시 메인 페이지로 이동,실패 처리 추가 필요
        onSuccess({ data }) {
          localStorage.setItem(TOKEN_KEY, data.token)
          navigate('/')
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
