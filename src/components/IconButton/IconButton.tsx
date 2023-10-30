import './IconButton.css'

interface IconButtonProps {
  color?:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'purple'
    | 'gray'
    | 'slate'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
  background?:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'purple'
    | 'gray'
    | 'slate'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
}

const IconButton = ({
  color,
  background,
  size,
  loading,
  disabled,
}: IconButtonProps) => {
  const iconBtnClasses = `iconbtn iconbtn-color--${color} iconbtn-background--${background} iconbtn-${size} ${
    loading ? 'iconbtn-loading' : ''
  } ${disabled ? 'iconbtn-disabled' : ''}`

  return <button className={iconBtnClasses}>asd</button>
}

export default IconButton
