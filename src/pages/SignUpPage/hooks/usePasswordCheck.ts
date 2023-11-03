import { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { checkPasswordConfirmPattern, checkPasswordPattern } from '@/utils'

interface UsePasswordCheckProps {
  setPasswordFailMsg: Dispatch<SetStateAction<string>>
  setPasswordConfirmFailMsg: Dispatch<SetStateAction<string>>
}

const usePasswordCheck = ({
  setPasswordFailMsg,
  setPasswordConfirmFailMsg,
}: UsePasswordCheckProps) => {
  const passwordRef = useRef(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handlePasswordFocusChange = () => {
    if (passwordRef.current !== document.activeElement) {
      setPasswordFailMsg(checkPasswordPattern({ password }))
      setPasswordConfirmFailMsg(
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
    passwordRef,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handlePasswordFocusChange,
  }
}

export default usePasswordCheck
