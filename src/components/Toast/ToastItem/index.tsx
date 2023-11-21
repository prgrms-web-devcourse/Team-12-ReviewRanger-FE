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
    <div className={'animate-slide-in'}>
      <div
        className={`relative flex min-h-[3.75rem] w-[25rem] items-center justify-between rounded-md p-[0.63rem] shadow-md ${TYPE_STYLES.BACKGROUND_COLOR[type]}`}
      >
        {children}
        <CloseIcon
          className="cursor-pointer fill-black dark:fill-white"
          onClick={() => removeToast({ id })}
        />
        <div
          className={`absolute bottom-1 left-0 h-1 w-full translate-y-full ${TYPE_STYLES.PROGRESS_BAR[type]} before:absolute before:bottom-0 before:right-0 before:h-full before:w-full before:animate-progress-animation before:content-[""]`}
        ></div>
      </div>
    </div>
  )
}

export default ToastItem
