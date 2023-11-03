import { Ref, useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { LoginProps } from '@/Pages/LoginPage'
import { ErrorAlert } from '@/Pages/LoginPage/components'
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
      <div className="flex flex-col items-center justify-center gap-4">
        <input
          className="rounded-5 w-[350px] max-w-[350px] border-2 border-black dark:h-[60px] dark:border-white dark:bg-main-red-100 dark:text-white"
          ref={emailRef}
          type="text"
          placeholder="email"
          onBlur={handleBlurEmail}
          onFocus={handleFocusEmail}
        />
        {!validEmail && (
          <ErrorAlert errortext="올바른 이메일 형식이 아닙니다" />
        )}

        <input
          className="rounded-5 w-[350px] max-w-[350px] border-2 border-black dark:h-[60px] dark:border-white dark:bg-main-red-100 dark:text-white"
          ref={passWordRef}
          type="password"
          placeholder="password"
        />
        <button className="btn" onClick={props.handleLogin}>
          로그인
        </button>
      </div>
    )
  },
)

export default LoginGroup
