import { useState, ChangeEvent, useRef, Dispatch, SetStateAction } from 'react'
import { checkEmailPattern } from '@/utils'

interface UseEmailCheckProps {
  setEmailFailMsg: Dispatch<SetStateAction<string>>
}

const useEmailCheck = ({ setEmailFailMsg }: UseEmailCheckProps) => {
  const emailRef = useRef(null)
  const [email, setEmail] = useState('')

  const handleEmailFocusChange = () => {
    if (emailRef.current !== document.activeElement) {
      const msg = checkEmailPattern({ email })
      setEmailFailMsg(msg)
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
