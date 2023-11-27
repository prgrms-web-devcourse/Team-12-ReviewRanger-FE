import { HTMLAttributes, PropsWithChildren } from 'react'

interface ItemProps extends HTMLAttributes<HTMLAnchorElement> {
  defaultClose?: boolean
  enabled?: boolean
}

const Item = ({
  children,
  defaultClose = false,
  enabled = true,
  ...props
}: PropsWithChildren<ItemProps>) => {
  return (
    <a
      className={`dropdown-item rounded-none text-center text-sm dark:text-white md:text-lg ${
        enabled
          ? 'hover:bg-gray-400 dark:hover:bg-gray-300'
          : 'cursor-auto hover:bg-white dark:hover:bg-main-gray'
      }`}
      tabIndex={defaultClose ? undefined : -1}
      {...props}
    >
      {children}
    </a>
  )
}

export default Item
