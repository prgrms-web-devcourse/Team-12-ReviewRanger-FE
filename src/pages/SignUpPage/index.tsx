import { PasswordInput } from '@/components'
import { useSignUp } from '@/apis/hooks'
import { CheckIcon } from '@/assets/icons'
import useEmailCheck from './hooks/useEmailCheck'
import useNameCheck from './hooks/useNameCheck'
import usePasswordCheck from './hooks/usePasswordCheck'

const SingUpPage = () => {
  const { email, uniqueEmail, handleEmailChange, handleEmailDuplicatedClick } =
    useEmailCheck()
  const { name, uniqueName, handleNameChange, handleNameDuplicatedClick } =
    useNameCheck()
  const { password, handlePasswordChange } = usePasswordCheck()

  const { mutate: signUp } = useSignUp()

  const handleSignUpButtonClick = () => {
    signUp({ email, name, password })
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-fit flex-col gap-6">
        <div>회원가입 페이지</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex h-fit w-fit items-center border-2 border-black">
              <input
                type="text"
                onChange={handleEmailChange}
                className="p-0 py-1.5 pl-3 focus:outline-none"
                placeholder="email"
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
    </div>
  )
}
export default SingUpPage
