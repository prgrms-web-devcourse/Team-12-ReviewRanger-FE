import { useState, ChangeEvent } from 'react'
import { PasswordInput } from '@/components'
import {
  useCreateSignUp,
  useCreateCheckDuplicatedName,
  useCreateCheckDuplicatedEmail,
} from '@/apis/hooks'
import { CheckIcon } from '@/assets/icons'

const SingUpPage = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [clickDuplicatedEmail, setClickDuplicatedEmail] = useState(false)
  const [clickDuplicatedName, setClickDuplicatedName] = useState(false)

  const { mutate: signUp } = useCreateSignUp()
  const { mutate: checkDuplicatedNameMutate, data: checkDuplicatedNameData } =
    useCreateCheckDuplicatedName()
  const { mutate: checkDuplicatedEmailMutate, data: checkDuplicatedEmailData } =
    useCreateCheckDuplicatedEmail()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClickDuplicatedEmail(false)
    setEmail(e.currentTarget.value)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClickDuplicatedName(false)
    setName(e.currentTarget.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleEmailDuplicatedClick = () => {
    checkDuplicatedEmailMutate({ email })
    setClickDuplicatedEmail(true)
  }

  const handleNameDuplicatedClick = () => {
    checkDuplicatedNameMutate({ name })
    setClickDuplicatedName(true)
  }

  const handleSignUpButtonClick = () => {
    signUp({ email, name, password })
  }

  return (
    <div className="flex w-fit flex-col gap-4">
      <div>회원가입 페이지</div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex h-fit w-fit items-center border-2 border-black">
            <input
              type="text"
              onChange={handleEmailChange}
              className="p-0 py-1.5 pl-3 focus:outline-none"
              placeholder="email"
              value={email}
            />
            <i
              className={`mx-1.5 ${
                clickDuplicatedEmail && checkDuplicatedEmailData?.data.success
                  ? 'none'
                  : 'hidden'
              }`}
            >
              <CheckIcon fill="#5dbb63" />
            </i>
          </div>
          <button
            className="btn h-fit py-1 hover:bg-yellow-200"
            onClick={handleEmailDuplicatedClick}
          >
            중복 확인
          </button>
        </div>
        <div className="flex gap-2">
          <div className="flex h-fit w-fit items-center border-2 border-black">
            <input
              type="text"
              onChange={handleNameChange}
              className="p-0 py-1.5 pl-3 focus:outline-none"
              placeholder="name"
              value={name}
            />
            <i
              className={`${
                clickDuplicatedName && checkDuplicatedNameData?.data.success
                  ? 'none'
                  : 'hidden'
              } mx-1.5`}
            >
              <CheckIcon fill="#5dbb63" />
            </i>
          </div>
          <button
            className="btn h-fit py-1 hover:bg-yellow-200"
            onClick={handleNameDuplicatedClick}
          >
            중복 확인
          </button>
        </div>
        <PasswordInput handlePasswordChange={handlePasswordChange} />
      </div>
      <button
        disabled={
          !(
            checkDuplicatedEmailData?.data.success &&
            checkDuplicatedNameData?.data.success &&
            clickDuplicatedEmail &&
            clickDuplicatedName &&
            password !== ''
          )
        }
        className="btn bg-green-200 text-black hover:bg-blue-300"
        onClick={handleSignUpButtonClick}
      >
        회원가입
      </button>
    </div>
  )
}
export default SingUpPage
