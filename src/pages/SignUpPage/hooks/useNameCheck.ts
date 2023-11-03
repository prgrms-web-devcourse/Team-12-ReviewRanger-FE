import { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'
import { checkNamePattern } from '@/utils'

interface UseNameCheckProps {
  setNameFailMsg: Dispatch<SetStateAction<string>>
}

const useNameCheck = ({ setNameFailMsg }: UseNameCheckProps) => {
  const nameRef = useRef(null)
  const [name, setName] = useState('')

  const handleNameFocusChange = () => {
    if (nameRef.current !== document.activeElement) {
      const msg = checkNamePattern({ name })
      setNameFailMsg(msg)
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
