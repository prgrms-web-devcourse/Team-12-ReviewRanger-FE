import { isAxiosError } from 'axios'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useToast } from '@/hooks'
import { useEditName, useUser } from '@/apis/hooks'
import { DUPLICATED_MESSAGE } from '@/constants'

interface UseEditNameCheckProps {
  currentName: string
  name: string
  setName: Dispatch<SetStateAction<string>>
  nameFailMessage: string
  setNameFailMessage: Dispatch<SetStateAction<string>>
}

const useEditNameCheck = ({
  currentName,
  name,
  setName,
  nameFailMessage,
  setNameFailMessage,
}: UseEditNameCheckProps) => {
  const [editNameButton, setEditNameButton] = useState<boolean>(false)
  const nameRef = useRef<HTMLLabelElement>(null)
  const { mutate: editName } = useEditName()
  const { refetch } = useUser()
  const { addToast } = useToast()

  const handleEditNameStartingClick = () => {
    setEditNameButton(true)
    setName(currentName)
  }

  const handleEditNameEndingClick = () => {
    if (currentName === name || !name) {
      setEditNameButton(false)
      setNameFailMessage('')

      return
    }
    if (nameFailMessage) {
      return
    }
    if (nameRef.current) {
      nameRef.current.click()
    }
  }

  const handleChangeNameComplete = () => {
    editName(
      { name },
      {
        onSuccess: async ({ data }) => {
          if ('status' in data && data.status === 'CONFLICT') {
            setNameFailMessage(DUPLICATED_MESSAGE.NAME)

            return
          }

          await refetch()

          setEditNameButton(false)
          setName('')
          addToast({
            message: '이름 변경이 완료되었습니다.',
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
    nameRef,
    editNameButton,
    handleEditNameStartingClick,
    handleEditNameEndingClick,
    handleChangeNameComplete,
  }
}

export default useEditNameCheck
