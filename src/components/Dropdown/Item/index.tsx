import { PropsWithChildren } from 'react'

interface ItemProps {
  handleClickItem?: () => void
  defaultClose?: boolean
}

const Item = ({
  children,
  handleClickItem,
  defaultClose = true,
}: PropsWithChildren<ItemProps>) => {
  return (
    <a
      className={`dropdown-item rounded-none text-sm  dark:text-white md:text-lg ${
        defaultClose ? 'hover:bg-gray-400 dark:hover:bg-gray-300' : ''
      }`}
      tabIndex={defaultClose ? undefined : -1}
      onClick={handleClickItem}
    >
      {children}
    </a>
  )
}

export default Item
