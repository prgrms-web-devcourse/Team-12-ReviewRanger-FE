import { createContext } from 'react'

interface ToastContextType {
  addToast: ({
    message,
    type,
  }: {
    message: string
    type: 'success' | 'error' | 'info'
  }) => void
  removeToast: ({ id }: { id: string }) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export default ToastContext
