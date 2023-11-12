import { useState, ChangeEvent } from 'react'
import { checkEmailPattern } from '@/utils'

const useEmailCheck = () => {
  const [email, setEmail] = useState('')
  const [emailFailMessage, setEmailFailMessage] = useState('')

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setEmailFailMessage(checkEmailPattern({ email: value }))
    setEmail(value)
  }

  return {
    email,
    emailFailMessage,
    setEmailFailMessage,
    handleEmailChange,
  }
}

export default useEmailCheck
