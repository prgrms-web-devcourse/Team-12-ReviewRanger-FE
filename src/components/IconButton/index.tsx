import { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  className?: string
  text?: string
}

const IconButton = ({
  disabled,
  className,
  children,
  text,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      className={`${className} btn flex h-14 items-center border border-black bg-white text-black  ${
        disabled ? 'btn-disabled' : ''
      }  `}
      {...rest}
    >
      {children}
      {text ?? 'Default'}
    </button>
  )
}

export default IconButton
