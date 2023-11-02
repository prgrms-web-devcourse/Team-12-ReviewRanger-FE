import { useState, ChangeEvent } from 'react'

const usePasswordCheck = () => {
  const [password, setPassword] = useState('')
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return {
    password,
    handlePasswordChange,
  }
}

export default usePasswordCheck
