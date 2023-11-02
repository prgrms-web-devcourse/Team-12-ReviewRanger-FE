import { useState, ChangeEvent } from 'react'
import { PasswordInput } from '@/components'
import {
  useSignUp,
  useCheckDuplicatedName,
  useCheckDuplicatedEmail,
} from '@/apis/hooks'
import { CheckIcon } from '@/assets/icons'

const SingUpPage = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [uniqueEmail, setUniqueEmail] = useState(false)
  const [uniqueName, setUniqueName] = useState(false)

  const { mutate: signUp } = useSignUp()
  const { mutate: checkDuplicatedEmail } = useCheckDuplicatedEmail()
  const { mutate: checkDuplicatedName } = useCheckDuplicatedName()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUniqueEmail(false)
    setEmail(e.currentTarget.value)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUniqueName(false)
    setName(e.currentTarget.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleEmailDuplicatedClick = () => {
    checkDuplicatedEmail(
      { email },
      {
        onSuccess: ({ data }) => {
          setUniqueEmail(data.success)
        },
      },
    )
  }

  const handleNameDuplicatedClick = () => {
    checkDuplicatedName(
      { name },
      {
        onSuccess: ({ data }) => {
          setUniqueName(data.success)
        },
      },
    )
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
            <i className={`mx-1.5 ${uniqueEmail ? 'none' : 'hidden'}`}>
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
            <i className={`${uniqueName ? 'none' : 'hidden'} mx-1.5`}>
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
        disabled={!(uniqueEmail && uniqueName && password !== '')}
        className="btn bg-green-200 text-black hover:bg-blue-300"
        onClick={handleSignUpButtonClick}
      >
        회원가입
      </button>
    </div>
  )
}
export default SingUpPage
