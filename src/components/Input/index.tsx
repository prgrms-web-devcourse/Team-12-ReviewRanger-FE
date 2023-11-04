import { ChangeEvent, FocusEvent, RefObject, useState } from 'react'
import { EyeOffIcon, EyeOnIcon } from '@/assets/icons'
import { INPUT_TYPE } from './constants'

interface InputProps {
  inputRef?: RefObject<HTMLInputElement>
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleInputBlur?: (e: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  type: keyof typeof INPUT_TYPE
  msg?: string
}

const Input = ({
  inputRef,
  disabled,
  type,
  handleInputChange,
  handleInputBlur,
  msg,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="flex flex-col justify-center gap-[0.44rem] border-2 border-black px-[0.63rem] pb-[0.69rem] pt-[0.31rem]">
      <div className="flex flex-row justify-between">
        <div className="h-4 text-xs text-gray-100">
          {INPUT_TYPE[type].TITLE}
        </div>
        {msg && <div className="text-xs text-sub-red-200">{msg}</div>}
      </div>
      <div className="flex flex-row">
        <input
          ref={inputRef}
          className="h-4 flex-1 border-0 text-sm text-black focus:outline-none"
          placeholder={INPUT_TYPE[type].PLACEHOLDER}
          disabled={disabled}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          type={
            type.includes('password') && !showPassword ? 'password' : 'text'
          }
          {...rest}
        />
        {type.includes('password') && (
          <i className="mx-2 w-fit cursor-pointer">
            {showPassword ? (
              <EyeOnIcon onClick={handleEyeClick} />
            ) : (
              <EyeOffIcon onClick={handleEyeClick} />
            )}
          </i>
        )}
      </div>
    </div>
  )
}

export default Input
