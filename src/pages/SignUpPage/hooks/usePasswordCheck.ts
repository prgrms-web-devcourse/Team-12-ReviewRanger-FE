import { useState, ChangeEvent } from 'react'
import { checkPasswordConfirmPattern, checkPasswordPattern } from '@/utils'

const usePasswordCheck = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordFailMessage, setPasswordFailMessage] = useState('')
  const [passwordConfirmFailMessage, setPasswordConfirmFailMessage] =
    useState('')

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setPasswordFailMessage(checkPasswordPattern({ password: value }))
    setPasswordConfirmFailMessage(
      checkPasswordConfirmPattern({
        password: value,
        passwordConfirm,
      }),
    )
    setPassword(value)
  }

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setPasswordConfirmFailMessage(
      checkPasswordConfirmPattern({
        password,
        passwordConfirm: value,
      }),
    )
    setPasswordConfirm(value)
  }

  return {
    password,
    passwordConfirm,
    passwordFailMessage,
    passwordConfirmFailMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  }
}

export default usePasswordCheck
