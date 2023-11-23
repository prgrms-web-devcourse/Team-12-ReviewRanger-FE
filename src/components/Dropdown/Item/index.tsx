import { PropsWithChildren } from 'react'

interface ItemProps {
  onClick?: () => void
  defaultClose?: boolean
}

const Item = ({
  children,
  onClick,
  defaultClose = true,
}: PropsWithChildren<ItemProps>) => {
  return (
    <a
      className={`dropdown-item rounded-none text-center text-sm dark:text-white md:text-lg ${
        defaultClose ? 'hover:bg-gray-400 dark:hover:bg-gray-300' : ''
      }`}
      tabIndex={defaultClose ? undefined : -1}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default Item
