import { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { checkPasswordConfirmPattern } from '@/utils'

interface UsePasswordConfirmCheckProps {
  password: string
  setPasswordConfirmFailMsg: Dispatch<SetStateAction<string>>
}

const usePasswordConfirmCheck = ({
  password,
  setPasswordConfirmFailMsg,
}: UsePasswordConfirmCheckProps) => {
  const passwordConfirmRef = useRef(null)
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handlePasswordConfirmFocusChange = () => {
    if (passwordConfirmRef.current !== document.activeElement) {
      const msg = checkPasswordConfirmPattern({ password, passwordConfirm })
      setPasswordConfirmFailMsg(msg)
    }
  }

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value.trim())
  }

  return {
    passwordConfirmRef,
    handlePasswordConfirmChange,
    handlePasswordConfirmFocusChange,
  }
}

export default usePasswordConfirmCheck
