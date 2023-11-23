import { PropsWithChildren } from 'react'
import Divider from './Divider'
import Item from './Item'
import Menu from './Menu'
import Toggle from './Toggle'

interface DropdownProps {
  className?: string
}

const Dropdown = ({
  className = '',
  children,
}: PropsWithChildren<DropdownProps>) => {
  return <div className={`dropdown ${className}`}>{children}</div>
}

Dropdown.Toggle = Toggle
Dropdown.Menu = Menu
Dropdown.Item = Item
Dropdown.Divider = Divider

export default Dropdown
