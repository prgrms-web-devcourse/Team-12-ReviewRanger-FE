import type { loginSchmaType } from './constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ErrorAlert } from '@/pages/LoginPage/components'
import { PATH } from '@/routes/constants'
import { loginSchema } from './constant'

//TODO - 비밀번호 유효성 검사 필요
interface LoginGroupProps {
  handleLogin: (email: string, password: string) => void
}

const LoginGroup = (props: LoginGroupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchmaType>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((data) => {
        props.handleLogin(data.email, data.password)
      })}
    >
      <div className="flex h-[60px] w-[350px] max-w-[350px] flex-col gap-2 border-2 border-black bg-white dark:border-white dark:bg-main-red-100 dark:text-white ">
        <label className="fontSize-xs text-gray-100">이메일</label>
        <input
          {...register('email')}
          className="fontSize-sm rounded-5 border-0  bg-white 
            text-black outline-0 dark:border-white dark:bg-main-red-100 dark:text-white"
          type="text"
          placeholder="email"
        />
      </div>
      {errors.email && <ErrorAlert errortext="올바른 이메일 형식이 아닙니다" />}
      <div className="flex h-[60px] w-[350px] max-w-[350px] flex-col border-2  border-black bg-white dark:border-white dark:bg-main-red-100 dark:text-white ">
        <label className="fontSize-xs text-gray-100">비밀번호</label>
        <input
          {...register('password')}
          className="fontSize-sm rounded-5 border-0  bg-white 
            text-black outline-0 dark:border-white dark:bg-main-red-100 dark:text-white"
          type="password"
          placeholder="password"
        />
      </div>
      {errors.password && (
        <ErrorAlert errortext="영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요" />
      )}

      <button className="rounded-5 fontSize-lg btn h-[54px] w-[350px] max-w-[350px]  bg-active-orange text-white dark:text-black">
        로그인
      </button>
      <a
        href={PATH.SIGN_UP}
        className="fontSize-sm flex w-[350px] max-w-[350px] justify-end text-xs text-active-orange"
      >
        회원가입
      </a>
    </form>
  )
}

export default LoginGroup
