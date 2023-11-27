import { PropsWithChildren } from 'react'

interface ToggleProps {
  className?: string
}

const Toggle = ({
  children,
  className = '',
}: PropsWithChildren<ToggleProps>) => {
  return (
    <label
      className={`${className}`}
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </label>
  )
}

export default Toggle
