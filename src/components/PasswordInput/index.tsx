import { ChangeEvent, FocusEvent, RefObject, useState } from 'react'
import { EyeOffIcon, EyeOnIcon } from '@/assets/icons'

interface PasswordInputProps {
  passwordRef?: RefObject<HTMLInputElement>
  handlePasswordChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handlePasswordBlur?: (e: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  type?: 'password' | 'passwordConfirm'
  placeholder?: string
  msg?: string
}

const PasswordInput = ({
  passwordRef,
  placeholder = '비밀번호를 입력하세요.',
  disabled,
  type,
  handlePasswordChange,
  handlePasswordBlur,
  msg,
  ...rest
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex flex-col justify-center gap-[0.44rem] border-2 border-black px-[0.63rem] pb-[0.69rem] pt-[0.31rem]">
      <div className="flex flex-row justify-between">
        <div className="h-4 text-xs text-gray-100">
          {type === 'password' ? '비밀번호' : '비밀번호 확인'}
        </div>
        {msg && <div className="text-sub-red-200 text-xs">{msg}</div>}
      </div>
      <div className="flex flex-row">
        <input
          ref={passwordRef}
          className="h-4 flex-1 border-0 text-xs text-black focus:outline-none"
          placeholder={placeholder}
          disabled={disabled}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
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
