import { ChangeEvent, useState } from 'react'
import { EyeOffIcon, EyeOnIcon } from '@/assets/icons'

interface PasswordInputProps {
  handlePasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  type?: 'password' | 'passwordConfirm'
  placeholder?: string
}

const PasswordInput = ({
  placeholder = '비밀번호를 입력하세요.',
  disabled,
  type,
  handlePasswordChange,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex flex-col justify-center gap-[0.44rem] border-2 border-black px-[0.63rem] pb-[0.69rem] pt-[0.31rem]">
      <div className="h-4 text-[0.625rem] text-[#BABABA]">
        {type === 'password' ? '비밀번호' : '비밀번호 확인'}
      </div>
      <div className="flex flex-row">
        <input
          className="h-4 flex-1 border-0 text-xs text-black focus:outline-none"
          placeholder={placeholder}
          disabled={disabled}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          {...rest}
        />
        <i className="mx-2 w-fit cursor-pointer">
          {showPassword ? (
            <EyeOnIcon onClick={handleEyeClick} />
          ) : (
            <EyeOffIcon onClick={handleEyeClick} />
          )}
        </i>
      </div>
    </div>
  )
}

export default PasswordInput
