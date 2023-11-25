import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/Input'

//TODO - 비밀번호 유효성 검사 필요
interface LoginGroupProps {
  handleLogin: (email: string, password: string) => void
}
const LoginGroup = ({ handleLogin }: LoginGroupProps) => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  return (
    <form
      className="flex flex-col items-center gap-5"
      onSubmit={handleSubmit((data) => {
        handleLogin(data.email, data.password)
      })}
    >
      <div>
        <Input type="email" register={register('email')} />
      </div>
      <div>
        <div>
          <Input type="password" register={register('password')} />
        </div>
      </div>
      <div className="flex flex-col items-stretch">
        <button className="pointer-cursor h-14 w-80 max-w-xs rounded-xl bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl">
          로그인
        </button>
        <button
          type="button"
          className="mt-2.5 self-end text-xs text-active-orange md:text-sm"
          onClick={() => navigate('/sign-up')}
        >
          회원가입
        </button>
      </div>
    </form>
  )
}

export default LoginGroup
