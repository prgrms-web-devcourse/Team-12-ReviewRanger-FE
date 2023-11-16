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
      className={`${className} btn flex h-14 items-center justify-center border border-black bg-white p-0 text-black  ${
        disabled ? 'btn-disabled' : ''
      }  `}
      {...rest}
    >
      {children}
      <span>{text ?? 'Default'}</span>
    </button>
  )
}

export default IconButton
