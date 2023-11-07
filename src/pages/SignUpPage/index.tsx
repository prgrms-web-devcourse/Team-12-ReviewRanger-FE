import { Input, Header } from '@/components'
import { LogoColIcon } from '@/assets/icons'
import { rangers } from '@/assets/images'
import {
  useEmailCheck,
  useNameCheck,
  usePasswordCheck,
  useSignUpCheck,
} from './hooks'

const SingUpPage = () => {
  const { email, emailFailMessage, setEmailFailMessage, handleEmailChange } =
    useEmailCheck()
  const { name, nameFailMessage, setNameFailMessage, handleNameChange } =
    useNameCheck()
  const {
    password,
    passwordConfirm,
    passwordFailMessage,
    passwordConfirmFailMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = usePasswordCheck()
  const { handleSignUpButtonClick } = useSignUpCheck({
    email,
    emailFailMessage,
    setEmailFailMessage,
    nameFailMessage,
    setNameFailMessage,
    name,
    password,
    passwordFailMessage,
    passwordConfirmFailMessage,
  })

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="h-full w-full items-center justify-center bg-main-ivory px-5 dark:bg-main-red-100 md:px-64">
        <div className="items-around flex h-full flex-col gap-14 pt-14">
          <div className="flex flex-col items-center justify-center">
            <LogoColIcon className="h-[4rem] w-[5.8rem] md:hidden" />
            <img
              className="h-24 w-24 md:h-40 md:w-40"
              src={rangers}
              alt="리뷰레인저 모음집"
            />
          </div>
          <div className="flex flex-col gap-5">
            <Input
              type="email"
              handleInputChange={handleEmailChange}
              message={emailFailMessage}
            />
            <Input
              type="name"
              handleInputChange={handleNameChange}
              message={nameFailMessage}
            />
            <Input
              type="password"
              handleInputChange={handlePasswordChange}
              message={passwordFailMessage}
            />
            <Input
              type="passwordConfirm"
              handleInputChange={handlePasswordConfirmChange}
              message={passwordConfirmFailMessage}
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
    </div>
  )
}
export default SingUpPage
