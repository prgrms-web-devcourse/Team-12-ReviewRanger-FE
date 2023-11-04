import { useState } from 'react'
import { Input } from '@/components'
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
    <div className="h-full w-full items-center justify-center px-5">
      <div className="flex flex-col gap-6">
        <div>회원가입 페이지</div>
        <div className="flex flex-col gap-2">
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
        </div>
        <button
          disabled={password === ''}
          className="btn bg-green-200 text-black hover:bg-blue-300"
          onClick={handleSignUpButtonClick}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}
export default SingUpPage
