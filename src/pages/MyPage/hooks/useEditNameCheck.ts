import { Dispatch, SetStateAction, useState } from 'react'
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
  const { mutate: editName } = useEditName()
  const { refetch } = useUser()

  const handleEditNameStartingClick = () => {
    setEditNameButton(true)
    setName(currentName)
  }

  const handleEditNameEndingClick = () => {
    if (currentName === name || !name) {
      setEditNameButton(false)

      return
    }
    if (nameFailMessage) {
      return
    }
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
        },
      },
    )
  }

  return {
    editNameButton,
    handleEditNameStartingClick,
    handleEditNameEndingClick,
  }
}

export default useEditNameCheck
