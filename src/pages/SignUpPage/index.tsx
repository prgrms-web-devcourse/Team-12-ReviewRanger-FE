import { isAxiosError } from 'axios'
import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmailCheck, useNameCheck, usePasswordCheck } from '@/hooks'
import { Input, Header } from '@/components'
import { useSignUp } from '@/apis/hooks'
import { LogoColIcon } from '@/assets/icons'
import { rangers } from '@/assets/images'

const SingUpPage = () => {
  const navigate = useNavigate()
  const { mutate: signUp } = useSignUp()

  const { email, emailFailMessage, setEmailFailMessage, handleEmailChange } =
    useEmailCheck()
  const { name, nameFailMessage, setNameFailMessage, handleNameChange } =
    useNameCheck()
  const {
    password,
    passwordFailMessage,
    passwordConfirm,
    passwordConfirmFailMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = usePasswordCheck()

  const handleSignUpButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      emailFailMessage ||
      nameFailMessage ||
      passwordFailMessage ||
      passwordConfirmFailMessage
    ) {
      return
    }

    signUp(
      { email, name, password },
      {
        onSuccess: () => navigate('/'),
        onError: (error) => {
          if (isAxiosError(error)) {
            const message = error.response?.data.message
            if (message.includes('이메일')) {
              setEmailFailMessage(message)
            } else {
              setNameFailMessage(message)
            }
          }
        },
      },
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <form className="h-full w-full items-center justify-center bg-main-ivory px-5 dark:bg-main-red-100 md:px-64">
        <div className="items-around flex h-full flex-col gap-14 pt-14">
          <div className="flex flex-col items-center justify-center">
            <LogoColIcon className="h-[4rem] w-[5.8rem] md:hidden" />
            <img
              className="h-24 w-24 md:h-40 md:w-40"
              src={rangers}
              alt="리뷰레인저 모음집"
            />
          </div>
          <div className="flex flex-col items-center gap-5">
            <Input
              type="email"
              onChange={handleEmailChange}
              message={emailFailMessage}
            />
            <Input
              type="name"
              onChange={handleNameChange}
              message={nameFailMessage}
            />
            <Input
              type="password"
              onChange={handlePasswordChange}
              message={passwordFailMessage}
            />
            <Input
              type="passwordConfirm"
              onChange={handlePasswordConfirmChange}
              message={passwordConfirmFailMessage}
            />
            <button
              className="h-14 w-80 max-w-xs rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
              onClick={handleSignUpButtonClick}
            >
              회원가입 완료
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default SingUpPage
