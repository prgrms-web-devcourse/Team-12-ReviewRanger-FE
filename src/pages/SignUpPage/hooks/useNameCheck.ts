import { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { checkNamePattern } from '@/utils'

interface UseNameCheckProps {
  setNameFailMessage: Dispatch<SetStateAction<string>>
}

const useNameCheck = ({ setNameFailMessage }: UseNameCheckProps) => {
  const nameRef = useRef(null)
  const [name, setName] = useState('')

  const handleNameFocusChange = () => {
    if (nameRef.current !== document.activeElement) {
      const message = checkNamePattern({ name })
      setNameFailMessage(message)
    }
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value.trim())
  }

  return {
    name,
    nameRef,
    handleNameChange,
    handleNameFocusChange,
  }
}

export default useNameCheck
