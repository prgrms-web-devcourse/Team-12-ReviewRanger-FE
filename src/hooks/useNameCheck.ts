import { useState, ChangeEvent } from 'react'
import { checkNamePattern } from '@/utils'

const useNameCheck = () => {
  const [name, setName] = useState('')
  const [nameFailMessage, setNameFailMessage] = useState('')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setNameFailMessage(checkNamePattern({ name: value }))
    setName(value)
  }

  return {
    name,
    setName,
    nameFailMessage,
    setNameFailMessage,
    handleNameChange,
  }
}

export default useNameCheck
