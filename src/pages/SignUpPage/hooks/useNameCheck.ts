import { useState, ChangeEvent } from 'react'
import { useCheckDuplicatedName } from '@/apis/hooks'

const useNameCheck = () => {
  const [name, setName] = useState('')
  const [uniqueName, setUniqueName] = useState(false)
  const { mutate: checkDuplicatedName } = useCheckDuplicatedName()

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUniqueName(false)
    setName(e.currentTarget.value)
  }

  const handleNameDuplicatedClick = () => {
    checkDuplicatedName(
      { name },
      {
        onSuccess: ({ data }) => {
          setUniqueName(data.success)
        },
      },
    )
  }

  return {
    name,
    uniqueName,
    handleNameChange,
    handleNameDuplicatedClick,
  }
}

export default useNameCheck
