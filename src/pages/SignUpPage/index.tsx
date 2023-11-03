import { useState } from 'react'
import { PasswordInput } from '@/components'
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
          <div className="flex gap-2">
            <div className="flex h-fit items-center border-2 border-black">
              <input
                ref={emailRef}
                onFocus={handleEmailFocusChange}
                onBlur={handleEmailFocusChange}
                type="text"
                onChange={handleEmailChange}
                className="p-0 py-1.5 pl-3 focus:outline-none"
                placeholder="email"
              />
              {emailFailMsg && (
                <div className="text-red-400">{emailFailMsg}</div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex h-fit items-center border-2 border-black">
              <input
                ref={nameRef}
                onBlur={handleNameFocusChange}
                type="text"
                onChange={handleNameChange}
                className="p-0 py-1.5 pl-3 focus:outline-none"
                placeholder="name"
              />
              {nameFailMsg && <div className="text-red-400">{nameFailMsg}</div>}
            </div>
          </div>
          <PasswordInput
            passwordRef={passwordRef}
            handlePasswordBlur={handlePasswordFocusChange}
            handlePasswordChange={handlePasswordChange}
            type="password"
            msg={passwordFailMsg}
          />
          <PasswordInput
            passwordRef={passwordRef}
            handlePasswordChange={handlePasswordConfirmChange}
            handlePasswordBlur={handlePasswordFocusChange}
            type="passwordConfirm"
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
