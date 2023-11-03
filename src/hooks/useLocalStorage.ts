import { useState, useEffect } from 'react'

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T | undefined, (value: T | undefined) => void] => {
  const [value, setValue] = useState<T | undefined>(defaultValue)

  useEffect(() => {
    const item = localStorage.getItem(key)

    if (!item && defaultValue !== undefined) {
      localStorage.setItem(key, JSON.stringify(defaultValue))
    }

    setValue(item ? JSON.parse(item) : defaultValue)

    const handler = (e: StorageEvent) => {
      if (e.key !== key) {
        return
      }
      setValue(JSON.parse(localStorage.getItem(key) ?? ''))
    }

    window.addEventListener('storage', handler)

    return () => {
      window.removeEventListener('storage', handler)
    }
  }, [defaultValue, key])

  const setLocalStorageValue = (value: T | undefined) => {
    try {
      setValue(value)
      if (value === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
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
