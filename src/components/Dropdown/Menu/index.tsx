import { PropsWithChildren } from 'react'

interface MenuProps {
  className?: string
  position?: 'right' | 'left' | 'center'
}

const Menu = ({
  className = '',
  position = 'left',
  children,
}: PropsWithChildren<MenuProps>) => {
  const menuPosition = {
    right: 'dropdown-menu-bottom-right',
    left: 'dropdown-menu-bottom-left',
    center: 'dropdown-menu-bottom-center',
  }

  return (
    <div
      className={`dropdown-menu border border-black bg-white px-0 shadow-md dark:border-white dark:bg-main-gray ${menuPosition[position]} ${className}`}
      onClick={(e) => e.stopPropagation()}
      tabIndex={-1}
    >
      {children}
    </div>
  )
}

export default Menu
