import { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { checkPasswordPattern } from '@/utils'

interface UsePasswordCheckProps {
  setPasswordFailMsg: Dispatch<SetStateAction<string>>
}

const usePasswordCheck = ({ setPasswordFailMsg }: UsePasswordCheckProps) => {
  const passwordRef = useRef(null)
  const [password, setPassword] = useState('')

  const handlePasswordFocusChange = () => {
    if (passwordRef.current !== document.activeElement) {
      const msg = checkPasswordPattern({ password })
      setPasswordFailMsg(msg)
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim())
  }

  return {
    password,
    passwordRef,
    handlePasswordChange,
    handlePasswordFocusChange,
  }
}

export default usePasswordCheck
