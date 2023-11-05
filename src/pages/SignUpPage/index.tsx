import { useState } from 'react'
import { Input } from '@/components'
import { LogoColIcon } from '@/assets/icons'
import { rangers } from '@/assets/images'
import {
  useEmailCheck,
  useNameCheck,
  usePasswordCheck,
  useSignUpCheck,
} from './hooks'

const SingUpPage = () => {
  const [emailFailMsg, setEmailFailMsg] = useState('')
  const [nameFailMsg, setNameFailMsg] = useState('')
  const [passwordFailMsg, setPasswordFailMsg] = useState('')
  const [passwordConfirmFailMsg, setPasswordConfirmFailMsg] = useState('')

  const { email, emailRef, handleEmailChange, handleEmailFocusChange } =
    useEmailCheck({ setEmailFailMsg })
  const { name, nameRef, handleNameChange, handleNameFocusChange } =
    useNameCheck({ setNameFailMsg })
  const {
    password,
    passwordConfirm,
    passwordRef,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handlePasswordFocusChange,
  } = usePasswordCheck({
    setPasswordFailMsg,
    setPasswordConfirmFailMsg,
  })
  const { handleSignUpButtonClick } = useSignUpCheck({
    email,
    emailFailMsg,
    setEmailFailMsg,
    nameFailMsg,
    setNameFailMsg,
    name,
    password,
    passwordFailMsg,
    passwordConfirmFailMsg,
  })

  return (
    <div className="h-full w-full items-center justify-center bg-main-ivory px-5 dark:bg-main-red-100 md:px-64">
      <div className="items-around flex h-full flex-col gap-14 pt-14">
        <div className="flex flex-col items-center justify-center">
          <div className="md:hidden">
            <LogoColIcon className="h-[4rem] w-[5.8rem]" />
          </div>
          <img
            className="h-24 w-24 md:h-40 md:w-40"
            src={rangers}
            alt="리뷰레인저 모음집"
          />
        </div>
        <div className="flex flex-col gap-5">
          <Input
            type="email"
            inputRef={emailRef}
            handleInputBlur={handleEmailFocusChange}
            handleInputChange={handleEmailChange}
            msg={emailFailMsg}
          />
          <Input
            type="name"
            inputRef={nameRef}
            handleInputBlur={handleNameFocusChange}
            handleInputChange={handleNameChange}
            msg={nameFailMsg}
          />
          <Input
            type="password"
            inputRef={passwordRef}
            handleInputBlur={handlePasswordFocusChange}
            handleInputChange={handlePasswordChange}
            msg={passwordFailMsg}
          />
          <Input
            type="passwordConfirm"
            inputRef={passwordRef}
            handleInputChange={handlePasswordConfirmChange}
            handleInputBlur={handlePasswordFocusChange}
            msg={passwordConfirmFailMsg}
          />
          <button
            disabled={!email || !name || !password || !passwordConfirm}
            className="h-14 rounded-xl bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
            onClick={handleSignUpButtonClick}
          >
            회원가입 완료
          </button>
        </div>
      </div>
    </div>
  )
}
export default SingUpPage
