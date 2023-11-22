import { useContext } from 'react'
import { ToastContext } from '@/contexts'

const useToast = () => {
  const toast = useContext(ToastContext)

  if (!toast) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return toast
}

export default useToast
