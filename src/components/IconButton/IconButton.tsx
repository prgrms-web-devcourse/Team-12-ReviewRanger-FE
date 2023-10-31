import { PropsWithChildren } from 'react'
import './IconButton.css'

interface IconButtonProps {
  disabled?: boolean
  className?: string
  text?: string
}

const IconButton = ({
  disabled,
  className,
  children,
  text,
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      className={`btn flex h-14 w-36 items-center gap-2 border border-black bg-white text-black  ${
        disabled ? 'btn-disabled' : ''
      } ${className} `}
    >
      {children}
      {text ?? 'Default'}
    </button>
  )
}

export default IconButton
