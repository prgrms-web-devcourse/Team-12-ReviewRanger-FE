import { useState, ChangeEvent, useRef, Dispatch, SetStateAction } from 'react'
import { checkEmailPattern } from '@/utils'

interface UseEmailCheckProps {
  setEmailFailMessage: Dispatch<SetStateAction<string>>
}

const useEmailCheck = ({ setEmailFailMessage }: UseEmailCheckProps) => {
  const emailRef = useRef(null)
  const [email, setEmail] = useState('')

  const handleEmailFocusChange = () => {
    if (emailRef.current !== document.activeElement) {
      const message = checkEmailPattern({ email })
      setEmailFailMessage(message)
    }
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  return {
    email,
    emailRef,
    handleEmailChange,
    handleEmailFocusChange,
  }
}

export default useEmailCheck
