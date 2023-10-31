import { PropsWithChildren } from 'react'
import './IconButton.css'

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
  disabled?: boolean
  className?: string
  text?: string
}

const IconButton = ({
  color,
  background,
  size,
  disabled,
  className,
  children,
  text,
}: PropsWithChildren<IconButtonProps>) => {
  const iconBtnClasses = `iconbtn iconbtn-color--${color} iconbtn-background--${background} iconbtn-${size} ${
    disabled ? 'iconbtn-disabled' : ''
  }`

  return (
    <button
      className={`flex h-14 w-36 items-center bg-white text-black ${iconBtnClasses} ${className} `}
    >
      {children}
      {text ?? 'Default'}
    </button>
  )
}

export default IconButton
