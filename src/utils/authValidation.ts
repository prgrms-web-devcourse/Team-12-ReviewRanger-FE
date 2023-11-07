import { AUTH_VALIDATION } from './constants'

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

  if (!AUTH_VALIDATION.EMAIL_REGEXP.test(trimmedEmail)) {
    return AUTH_VALIDATION.MESSAGE.INVALID.EMAIL
  } else {
    return AUTH_VALIDATION.MESSAGE.VALID
  }
}

export const checkNamePattern = ({ name }: CheckNamePatternProps) => {
  const trimmedName = name.trim()

  if (
    !AUTH_VALIDATION.NAME_REGEXP.test(trimmedName) ||
    trimmedName.length < AUTH_VALIDATION.NAME_MIN_LENGTH ||
    trimmedName.length > AUTH_VALIDATION.NAME_MAX_LENGTH
  ) {
    return AUTH_VALIDATION.MESSAGE.INVALID.NAME
  } else {
    return AUTH_VALIDATION.MESSAGE.VALID
  }
}

export const checkPasswordPattern = ({
  password,
}: CheckPasswordPatternProps) => {
  const trimmedPassword = password.trim()

  if (!AUTH_VALIDATION.PASSWORD_REGEXP.test(trimmedPassword)) {
    return AUTH_VALIDATION.MESSAGE.INVALID.PASSWORD
  } else {
    return AUTH_VALIDATION.MESSAGE.VALID
  }
}

export const checkPasswordConfirmPattern = ({
  password,
  passwordConfirm,
}: CheckPasswordConfirmPatternProps) => {
  const trimmedPassword = password.trim()
  const trimmedPasswordConfirm = passwordConfirm.trim()

  if (trimmedPassword !== trimmedPasswordConfirm) {
    return AUTH_VALIDATION.MESSAGE.INVALID.PASSWORD_CONFIRM
  } else {
    return AUTH_VALIDATION.MESSAGE.VALID
  }
}
