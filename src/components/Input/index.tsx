import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { EyeOffIcon, EyeOnIcon } from '@/assets/icons'
import { INPUT_TYPE } from './constants'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: keyof typeof INPUT_TYPE
  message?: string
  register?: UseFormRegisterReturn
  width?: number
}

const Input = ({
  disabled,
  type,
  onChange,
  message,
  register,
  placeholder = INPUT_TYPE[type].PLACEHOLDER,
  value,
  className,
  width,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const w = width ? `w-${width}` : 'w-80'

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div
      className={`flex ${className} ${w} max-w-xs flex-col justify-center gap-[0.44rem] rounded-md border border-gray-100 bg-main-yellow px-[0.63rem] pb-[0.69rem] pt-[0.31rem] focus-within:border-black dark:border-gray-300 dark:bg-main-red-200 dark:focus-within:border-white`}
    >
      <div className="flex flex-row justify-between">
        <div className="h-4 text-xs text-gray-200 dark:text-gray-100 md:text-sm">
          {INPUT_TYPE[type].TITLE}
        </div>
        {message && (
          <div className="text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
            {message}
          </div>
        )}
      </div>
      <div className="flex flex-row">
        <input
          value={value}
          {...register}
          className="h-4 flex-1 border-0 bg-transparent text-sm text-black placeholder:text-gray-100 focus:outline-none dark:text-white md:text-lg"
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          type={
            type.includes('password') && !showPassword ? 'password' : 'text'
          }
          autoComplete={type.includes('password') ? 'new-password' : 'on'}
        />
        {type.includes('password') && (
          <i className="cursor-pointer">
            {showPassword ? (
              <EyeOnIcon
                onClick={handleEyeClick}
                className="fill-black dark:fill-white"
              />
            ) : (
              <EyeOffIcon
                onClick={handleEyeClick}
                className="fill-black dark:fill-white"
              />
            )}
          </i>
        )}
      </div>
    </div>
  )
}

export default Input
