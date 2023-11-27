import { useRef, useState } from 'react'
import { useEditPassword } from '@/apis/hooks'

interface UseEditPasswordCheckProps {
  password: string
  passwordConfirm: string
  passwordFailMessage: string
  passwordConfirmFailMessage: string
}

const useEditPasswordCheck = ({
  password,
  passwordConfirm,
  passwordFailMessage,
  passwordConfirmFailMessage,
}: UseEditPasswordCheckProps) => {
  const [editPasswordButton, setEditPasswordButton] = useState<boolean>(false)
  const passwordRef = useRef<HTMLLabelElement>(null)
  const { mutate: editPassword } = useEditPassword()

  const handleEditPasswordStartingClick = () => {
    setEditPasswordButton(true)
  }

  const handleEditPasswordEndingClick = () => {
    if (passwordRef.current) {
      passwordRef.current.click()
    }
    if (!password && !passwordConfirm) {
      setEditPasswordButton(false)

      return
    }
    if (passwordFailMessage || passwordConfirmFailMessage) {
      return
    }
    editPassword(
      { password },
      {
        onSuccess: () => setEditPasswordButton(false),
      },
    )
  }

  return {
    passwordRef,
    editPasswordButton,
    handleEditPasswordStartingClick,
    handleEditPasswordEndingClick,
  }
}

export default useEditPasswordCheck
