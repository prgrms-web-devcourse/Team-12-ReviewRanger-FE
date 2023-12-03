import { isAxiosError } from 'axios'
import { useRef, useState } from 'react'
import { useToast } from '@/hooks'
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
  const { addToast } = useToast()

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
        onSuccess: () => {
          setEditPasswordButton(false)
          addToast({
            message: '비밀번호 변경이 완료되었습니다.',
            type: 'success',
          })
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            addToast({ message: error.response?.data.message, type: 'error' })
          }
        },
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
