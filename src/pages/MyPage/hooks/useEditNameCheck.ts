import { Dispatch, SetStateAction, useState } from 'react'
import { useEditName } from '@/apis/hooks'
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

  const handleEditNameStartingClick = () => {
    setEditNameButton(true)
    setName(currentName)
  }

  const handleEditNameEndingClick = () => {
    if (nameFailMessage) {
      return
    }
    if (currentName === name) {
      setEditNameButton(false)

      return
    }
    editName(
      { name },
      {
        onSuccess: ({ data }) => {
          if (data.status === 'CONFLICT') {
            setNameFailMessage(DUPLICATED_MESSAGE.NAME)

            return
          }

          setEditNameButton(false)
          setName('')
          // TODO: User 데이터를 refetch해서 업데이트 해주기.
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
