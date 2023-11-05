import type { loginSchmaType } from './constant'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EyeOnIcon, EyeOffIcon } from '@/assets/icons'
import { ErrorAlert } from '@/pages/LoginPage/components'
import { PATH } from '@/routes/constants'
import { loginSchema } from './constant'

//TODO - 비밀번호 유효성 검사 필요
interface LoginGroupProps {
  handleLogin: (email: string, password: string) => void
}

const LoginGroup = (props: LoginGroupProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleEyeClick = () => {
    setShowPassword(!showPassword)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchmaType>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit((data) => {
        props.handleLogin(data.email, data.password)
      })}
    >
      <div className="dark:focus-within:border-white\ flex flex-col justify-center gap-[0.44rem] rounded-md border border-gray-100 bg-white px-[0.63rem] pb-[0.69rem] pt-[0.31rem] focus-within:border-black dark:bg-main-red-200">
        <label className="fontSize-xs text-gray-100">이메일</label>
        <input
          {...register('email')}
          className="h-4 flex-1 border-0 bg-white text-sm text-black focus:outline-none dark:bg-main-red-200 dark:text-white md:text-lg"
          type="text"
          placeholder="email"
        />
      </div>
      {errors.email && <ErrorAlert errortext="올바른 이메일 형식이 아닙니다" />}
      <div className="flex flex-col justify-center gap-[0.44rem] rounded-md border border-gray-100 bg-white px-[0.63rem] pb-[0.69rem] pt-[0.31rem] focus-within:border-black dark:bg-main-red-200 dark:focus-within:border-white">
        <label className="fontSize-xs text-gray-100">비밀번호</label>
        <div className="flex items-center">
          <input
            {...register('password')}
            className="h-4 flex-1 border-0 bg-white text-sm text-black focus:outline-none dark:bg-main-red-200 dark:text-white md:text-lg"
            type={showPassword ? 'password' : 'text'}
            placeholder="password"
          />
          <i className="mx-2 w-fit cursor-pointer">
            {showPassword ? (
              <EyeOnIcon onClick={handleEyeClick} className="dark:fill-white" />
            ) : (
              <EyeOffIcon
                onClick={handleEyeClick}
                className="dark:fill-white"
              />
            )}
          </i>
        </div>
      </div>
      {errors.password && (
        <ErrorAlert errortext="영문+숫자+특수문자 조합 8~15자리를 입력해주세요" />
      )}

      <button
        className="h-14 rounded-xl bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
        disabled={!!(errors.email || errors.password)}
      >
        로그인
      </button>
      <a
        href={PATH.SIGN_UP}
        className="flex w-[350px] max-w-[350px] justify-end text-xs text-active-orange md:text-sm"
      >
        회원가입
      </a>
    </form>
  )
}

export default LoginGroup
