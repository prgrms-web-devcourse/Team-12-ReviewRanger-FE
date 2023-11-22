import { PropsWithChildren } from 'react'
import { CloseIcon } from '@/assets/icons'
import useToast from '@/hooks/useToast'
import { TYPE_STYLES } from '../constants'
import { ToastType } from '../types'

interface ToastProps {
  id: string
  type: ToastType
}

const ToastItem = ({ id, type, children }: PropsWithChildren<ToastProps>) => {
  const { removeToast } = useToast()

  return (
    <div className="animate-slide-in">
      <div
        className={`relative flex min-h-[3.125rem] w-full items-center justify-between rounded-md p-[0.63rem] text-sm shadow-md md:w-[25rem] md:text-lg ${TYPE_STYLES.BACKGROUND_COLOR[type]}`}
      >
        {children}
        <CloseIcon
          className="shrink-0 cursor-pointer dark:fill-white"
          onClick={() => removeToast({ id })}
        />
        <div
          className={`before:animate-progress-animation absolute bottom-1 left-0 h-1 w-full  translate-y-full before:absolute before:bottom-0 before:right-0 before:h-full before:w-full before:content-[""] ${TYPE_STYLES.PROGRESS_BAR[type]}`}
        ></div>
      </div>
    </div>
  )
}

export default ToastItem
