import { useState, ChangeEvent } from 'react'
import { useCheckDuplicatedEmail } from '@/apis/hooks'

const useEmailCheck = () => {
  const [email, setEmail] = useState('')
  const [uniqueEmail, setUniqueEmail] = useState(false)
  const { mutate: checkDuplicatedEmail } = useCheckDuplicatedEmail()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUniqueEmail(false)
    setEmail(e.currentTarget.value)
  }

  const handleEmailDuplicatedClick = () => {
    checkDuplicatedEmail(
      { email },
      {
        onSuccess: ({ data }) => {
          setUniqueEmail(data.success)
        },
      },
    )
  }

  return {
    email,
    uniqueEmail,
    handleEmailChange,
    handleEmailDuplicatedClick,
  }
}

export default useEmailCheck
