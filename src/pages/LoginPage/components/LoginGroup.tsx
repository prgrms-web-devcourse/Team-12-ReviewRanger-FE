import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EyeOnIcon, EyeOffIcon } from '@/assets/icons'
import { PATH } from '@/routes/constants'

//TODO - 비밀번호 유효성 검사 필요
interface LoginGroupProps {
  handleLogin: (email: string, password: string) => void
}

const LoginGroup = ({ handleLogin }: LoginGroupProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleEyeClick = () => {
    setShowPassword(!showPassword)
  }
  const { register, handleSubmit } = useForm()

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit((data) => {
        handleLogin(data.email, data.password)
      })}
    >
      <div className="flex flex-col justify-center gap-[0.44rem] rounded-md border border-gray-100 bg-white px-[0.63rem] pb-[0.69rem] pt-[0.31rem] focus-within:border-black dark:bg-main-red-200 dark:focus-within:border-white">
        <label className="h-4 text-xs text-gray-100 md:text-sm">이메일</label>
        <input
          {...register('email')}
          className="h-4 flex-1 border-0 bg-white text-sm text-black focus:outline-none dark:bg-main-red-200 dark:text-white md:text-lg"
          type="text"
          placeholder="email"
        />
      </div>
      <div className="flex flex-col justify-center gap-[0.44rem] rounded-md border border-gray-100 bg-white px-[0.63rem] pb-[0.69rem] pt-[0.31rem] focus-within:border-black dark:bg-main-red-200 dark:focus-within:border-white">
        <label className="h-4 text-xs text-gray-100 md:text-sm">비밀번호</label>
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
      <button className="pointer-cursor h-14 rounded-xl bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl">
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
