import { useEffect, useState } from 'react'

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState(defaultValue)
  useEffect(() => {
    const item = localStorage.getItem(key)

    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue))
    }
    setValue(item ? JSON.parse(item) : defaultValue)

    const handler = (e: StorageEvent) => {
      if (e.key !== key) {
        //잘못된 키일 경우
        return
      }
      setValue(JSON.parse(localStorage.getItem(key) ?? ''))
    }

    window.addEventListener('storage', handler)

    return () => {
      window.removeEventListener('storage', handler)
    }
  }, [defaultValue, key])

  const setLocalStorageValue = (value: T) => {
    try {
      setValue(value)
      localStorage.setItem(key, JSON.stringify(value))
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
        }),
      )
    } catch (e) {
      console.error(e)
    }
  }

  return [value, setLocalStorageValue]
}

export default useLocalStorage
