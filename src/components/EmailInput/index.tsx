import { ChangeEvent, FocusEvent, RefObject } from 'react'

interface EmailInputProps {
  emailRef?: RefObject<HTMLInputElement>
  handleEmailChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleEmailBlur?: (e: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  msg?: string
}

const EmailInput = ({
  emailRef,
  placeholder = '이메일을 입력하라구!',
  disabled,
  handleEmailChange,
  handleEmailBlur,
  msg,
  ...rest
}: EmailInputProps) => {
  return (
    <div className="flex flex-col justify-center gap-[0.44rem] border-2 border-black px-[0.63rem] pb-[0.69rem] pt-[0.31rem]">
      <div className="flex flex-row justify-between">
        <div className="h-4 text-xs text-gray-100">이메일</div>
        {msg && <div className="text-sub-red-200 text-xs">{msg}</div>}
      </div>
      <div className="flex flex-row">
        <input
          ref={emailRef}
          className="h-4 flex-1 border-0 text-sm text-black focus:outline-none"
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          {...rest}
        />
      </div>
    </div>
  )
}

export default EmailInput
