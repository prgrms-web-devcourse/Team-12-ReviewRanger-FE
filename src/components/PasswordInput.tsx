import { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { PassWord, PassWordConfirm } from '@/assets/icons'

interface PasswordInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'onChange'> {
  type: 'password' | 'confirmation'
  onChange?: (newPassword?: string) => void
  disabled?: boolean
  placeholder?: string
}

const PassWordInput = ({
  type,
  placeholder,
  disabled,
  onChange,
  ...rest // 나머지 프로퍼티를 수집
}: PasswordInputProps) => {
  const handlePassWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }

  return (
    <div className="items-center2 relative flex h-fit w-fit flex-row content-center justify-center gap-2 border-2 border-black">
      <input
        className="input border-0 bg-white pl-8 text-black"
        placeholder={placeholder ?? '새 비밀번호 입력'}
        disabled={disabled}
        onChange={handlePassWordChange}
        {...rest} // 나머지 프로퍼티를 전달
      />
      <i className="flex items-center">
        {type === 'password' ? <PassWord /> : <PassWordConfirm />}
      </i>
    </div>
  )
}

export default PassWordInput
