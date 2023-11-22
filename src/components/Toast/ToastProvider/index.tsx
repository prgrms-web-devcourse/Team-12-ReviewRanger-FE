import { nanoid } from 'nanoid'
import { PropsWithChildren, useState } from 'react'
import { ToastContext } from '@/contexts'
import ToastContainer from '../ToastContainer'
import { Toast } from '../types'

interface ToastProviderProps {
  options?: {
    duration?: number
  }
}

const ToastProvider = ({
  children,
  options = { duration: 3000 },
}: PropsWithChildren<ToastProviderProps>) => {
  const [toastList, setToastList] = useState<Toast[]>([])

  const addToast = ({ message, type }: Omit<Toast, 'id'>) => {
    const id = nanoid()

    setToastList((prev) => [{ id, message, type }, ...prev])
    setTimeout(() => removeToast({ id }), options.duration)
  }

  const removeToast = ({ id }: { id: string }) => {
    setToastList((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toastList={toastList} />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
