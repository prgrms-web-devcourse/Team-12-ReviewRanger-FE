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
    <div className="fixed top-16 z-50 flex w-full flex-col gap-2 px-5 md:right-5 md:top-24 md:w-fit md:px-0">
      {toastList.map((toast) => (
        <ToastItem key={toast.id} {...toast}>
          <p className="shrink-0 text-lg md:text-2xl">
            {TYPE_IMOJI[toast.type]}
          </p>
          <p className="w-3/4 dark:text-white">{toast.message}</p>
        </ToastItem>
      ))}
    </div>,
    document.body,
  )
}

export default ToastContainer
