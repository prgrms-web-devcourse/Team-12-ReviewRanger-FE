import { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'disabled' & 'className'> {
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
}: PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      className={`btn flex h-14 items-center border border-black bg-white text-black  ${
        disabled ? 'btn-disabled' : ''
      } ${className} `}
      onClick={rest.onClick}
      type={rest.type}
    >
      {children}
      {text ?? 'Default'}
    </button>
  )
}

export default IconButton
