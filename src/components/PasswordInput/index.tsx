import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { EyeOffIcon, EyeOnIcon } from '@/assets/icons'

interface PasswordInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  type: 'password' | 'confirmation'
  handlePasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
}

const PasswordInput = ({
  type,
  placeholder,
  disabled,
  handlePasswordChange,
  ...rest
}: PasswordInputProps) => {
  return (
    <div className="items-center2 relative flex h-fit w-fit flex-row content-center justify-center gap-2 border-2 border-black">
      <input
        className="input border-0 bg-white pl-8 text-black"
        placeholder={placeholder ?? '새 비밀번호 입력'}
        disabled={disabled}
        onChange={handlePasswordChange}
        {...rest}
      />
      <i className="flex items-center">
        {type === 'password' ? <EyeOffIcon /> : <EyeOnIcon />}
      </i>
    </div>
  )
}

export default PasswordInput
