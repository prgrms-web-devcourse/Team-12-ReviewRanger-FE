import { createPortal } from 'react-dom'
import ToastItem from '../ToastItem'
import { TYPE_IMOJI } from '../constants'
import { ToastType } from '../types'

export interface ToastContainerProps {
  toastList: {
    id: string
    message: string
    type: ToastType
  }[]
}

const ToastContainer = ({ toastList }: ToastContainerProps) => {
  return createPortal(
    <div className="fixed right-5 top-24 z-50 flex flex-col gap-2">
      {toastList.map((toast) => (
        <ToastItem key={toast.id} {...toast}>
          <p>{TYPE_IMOJI[toast.type]}</p>
          <p className="absolute left-1/2 top-1/2 w-8/12 -translate-x-1/2 -translate-y-1/2 dark:text-white">
            {toast.message}
          </p>
        </ToastItem>
      ))}
    </div>,
    document.body,
  )
}

export default ToastContainer
