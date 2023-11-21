import { PropsWithChildren } from 'react'

interface MenuProps {
  className?: string
  position?: 'right' | 'left'
}

const Menu = ({
  className = '',
  position = 'left',
  children,
}: PropsWithChildren<MenuProps>) => {
  const menuPosition = `dropdown-menu-bottom-${position}`

  return (
    <div
      className={`dropdown-menu rounded-md border border-black bg-white shadow-md dark:border-white dark:bg-main-gray ${menuPosition} ${className}`}
    >
      {children}
    </div>
  )
}

export default Menu
