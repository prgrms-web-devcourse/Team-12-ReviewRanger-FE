const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,8}$/
const PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,15}$/
const NAME_REGEXP = /^[a-zA-Z0-9가-힣[\]-]+$/
const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 12
const VALID_MESSAGE = ''
const INVALID_EMAIL_MESSAGE = '유효한 이메일 주소가 아니야!'
const INVALID_NAME_MESSAGE = '3 ~ 12자의 문자 또는 숫자로만 만들라구!'
const INVALID_PASSWORD_MESSAGE = '5 ~ 15자로 문자와 숫자를 포함해야 만들라구!'
const INVALID_PASSWORD_CONFIRM_MESSAGE = '비밀번호가 일치하지 않는군!'

interface CheckEmailPatternProps {
  email: string
}

interface CheckNamePatternProps {
  name: string
}

interface CheckPasswordPatternProps {
  password: string
}

interface CheckPasswordConfirmPatternProps {
  password: string
  passwordConfirm: string
}

export const checkEmailPattern = ({ email }: CheckEmailPatternProps) => {
  const trimmedEmail = email.trim()

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    return INVALID_EMAIL_MESSAGE
  } else {
    return VALID_MESSAGE
  }
}

export const checkNamePattern = ({ name }: CheckNamePatternProps) => {
  const trimmedName = name.trim()

  if (
    !NAME_REGEXP.test(trimmedName) ||
    trimmedName.length < NAME_MIN_LENGTH ||
    trimmedName.length > NAME_MAX_LENGTH
  ) {
    return INVALID_NAME_MESSAGE
  } else {
    return VALID_MESSAGE
  }
}

export const checkPasswordPattern = ({
  password,
}: CheckPasswordPatternProps) => {
  const trimmedPassword = password.trim()

  if (!PASSWORD_REGEXP.test(trimmedPassword)) {
    return INVALID_PASSWORD_MESSAGE
  } else {
    return VALID_MESSAGE
  }
}

export const checkPasswordConfirmPattern = ({
  password,
  passwordConfirm,
}: CheckPasswordConfirmPatternProps) => {
  const trimmedPassword = password.trim()
  const trimmedPasswordConfirm = passwordConfirm.trim()

  if (trimmedPassword !== trimmedPasswordConfirm) {
    return INVALID_PASSWORD_CONFIRM_MESSAGE
  } else {
    return VALID_MESSAGE
  }
}
