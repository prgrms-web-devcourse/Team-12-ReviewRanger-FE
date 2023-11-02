import { ChangeEvent, useState } from 'react'
import { EyeOffIcon, EyeOnIcon } from '@/assets/icons'

interface PasswordInputProps {
  handlePasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
}

const PasswordInput = ({
  placeholder = '비밀번호를 입력하세요.',
  disabled,
  handlePasswordChange,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex h-fit w-fit flex-row items-center justify-center border-2 border-black">
      <input
        className="input border-0 bg-white p-0 pl-3 text-black"
        placeholder={placeholder}
        disabled={disabled}
        onChange={handlePasswordChange}
        type={showPassword ? 'text' : 'password'}
        {...rest}
      />
      <i className="mx-2 cursor-pointer">
        {showPassword ? (
          <EyeOnIcon onClick={handleEyeClick} />
        ) : (
          <EyeOffIcon onClick={handleEyeClick} />
        )}
      </i>
    </div>
  )
}

export default PasswordInput
