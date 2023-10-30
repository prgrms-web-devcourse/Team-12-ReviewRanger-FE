import { PropsWithChildren } from 'react'
import './IconButton.css'
import { generateClass } from '@/utils'

interface IconButtonProps {
  color?:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'purple'
    | 'gray'
    | 'slate'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
  background?:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'purple'
    | 'gray'
    | 'slate'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  className?: string[] | string
}

const IconButton = ({
  color,
  background,
  size,
  loading,
  disabled,
  className,
  children,
}: PropsWithChildren<IconButtonProps>) => {
  const iconBtnClasses = `iconbtn iconbtn-color--${color} iconbtn-background--${background} iconbtn-${size} ${
    loading ? 'iconbtn-loading' : ''
  } ${disabled ? 'iconbtn-disabled' : ''}`

  const customClasses = className && generateClass(className)

  return (
    <button
      className={`flex h-14 w-36 items-center bg-white text-black ${iconBtnClasses} ${customClasses} `}
    >
      {!loading && children}
      Default
    </button>
  )
}

export default IconButton
