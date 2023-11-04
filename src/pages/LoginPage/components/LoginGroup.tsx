import { Ref, useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { LoginProps } from '@/Pages/LoginPage'
import { ErrorAlert } from '@/Pages/LoginPage/components'
import { PATH } from '@/routes/constants'
import { validateEmail } from '@/utils'

//TODO - 비밀번호 유효성 검사 필요
interface LoginGroupProps {
  handleLogin: () => void
}

const LoginGroup = forwardRef(
  (props: LoginGroupProps, ref: Ref<{ getValues: () => LoginProps }>) => {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passWordRef = useRef<HTMLInputElement | null>(null)

    const [validEmail, setValidEmail] = useState<boolean>(true)
    const handleFocusEmail = () => {
      setValidEmail(true)
    }

    const handleBlurEmail = () => {
      if (emailRef.current?.value) {
        setValidEmail(validateEmail(emailRef.current.value))
      }
    }

    useImperativeHandle(ref, () => ({
      getValues: () => {
        return {
          email: emailRef.current?.value ?? '',
          password: passWordRef.current?.value ?? '',
        }
      },
    }))

    return (
      <>
        <div className="flex h-[60px] w-[350px] max-w-[350px] flex-col border-2  border-black bg-white dark:border-white dark:bg-main-red-100 dark:text-white ">
          <label className="fontSize-xs text-gray-100">이메일</label>
          <input
            className="fontSize-sm rounded-5 border-0  bg-white 
            text-black outline-0 dark:border-white dark:bg-main-red-100 dark:text-white"
            ref={emailRef}
            type="text"
            placeholder="email"
            onBlur={handleBlurEmail}
            onFocus={handleFocusEmail}
          />
        </div>
        {!validEmail && (
          <ErrorAlert errortext="올바른 이메일 형식이 아닙니다" />
        )}
        <div className="flex h-[60px] w-[350px] max-w-[350px] flex-col border-2  border-black bg-white dark:border-white dark:bg-main-red-100 dark:text-white ">
          <label className="fontSize-xs text-gray-100">비밀번호</label>
          <input
            className="fontSize-sm rounded-5 border-0  bg-white 
            text-black outline-0 dark:border-white dark:bg-main-red-100 dark:text-white"
            ref={passWordRef}
            type="password"
            placeholder="password"
          />
        </div>

        <button
          className="rounded-5 fontSize-lg btn h-[54px] w-[350px] max-w-[350px]  bg-active-orange text-white dark:text-black"
          onClick={props.handleLogin}
          disabled={!validEmail}
        >
          로그인
        </button>
        <a
          href={PATH.SIGN_UP}
          className="fontSize-sm flex w-[350px] max-w-[350px] justify-end text-xs text-active-orange"
        >
          회원가입
        </a>
      </>
    )
  },
)

export default LoginGroup
