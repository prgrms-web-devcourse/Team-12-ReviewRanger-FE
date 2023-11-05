import { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { checkPasswordConfirmPattern, checkPasswordPattern } from '@/utils'

interface UsePasswordCheckProps {
  setPasswordFailMessage: Dispatch<SetStateAction<string>>
  setPasswordConfirmFailMessage: Dispatch<SetStateAction<string>>
}

const usePasswordCheck = ({
  setPasswordFailMessage,
  setPasswordConfirmFailMessage,
}: UsePasswordCheckProps) => {
  const passwordRef = useRef(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handlePasswordFocusChange = () => {
    if (passwordRef.current !== document.activeElement) {
      setPasswordFailMessage(checkPasswordPattern({ password }))
      setPasswordConfirmFailMessage(
        checkPasswordConfirmPattern({ password, passwordConfirm }),
      )
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim())
  }

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value.trim())
  }

  return {
    password,
    passwordConfirm,
    passwordRef,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handlePasswordFocusChange,
  }
}

export default usePasswordCheck
