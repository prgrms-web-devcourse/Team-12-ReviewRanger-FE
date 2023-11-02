import { useState, ChangeEvent } from 'react'
import { useLogin } from '@/apis/hooks'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [token, setToken] = useState('')

  const { mutate: loginMutate } = useLogin()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLoginButtonClick = () => {
    loginMutate(
      { email, password },
      {
        onSuccess: ({ data }) => {
          setToken(data)
        },
      },
    )
  }

  return (
    <div className="flex w-fit flex-col gap-2">
      <div>로그인 페이지</div>
      <input
        value={email}
        type="text"
        className="border border-black"
        onChange={handleEmailChange}
        placeholder="email"
      />
      <input
        value={password}
        type="text"
        className="border border-black"
        onChange={handlePasswordChange}
        placeholder="password"
      />
      <button className="btn" onClick={handleLoginButtonClick}>
        로그인
      </button>
      <div className="flex flex-row gap-2">
        <p className="font-bold">JWT : </p>
        <p>{token}</p>
      </div>
    </div>
  )
}
export default LoginPage
