const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
// const NAME_REGEXP = /[~!@#$%^&*()_+|<>?:{}]/
const NAME_REGEXP = /^[a-zA-Z0-9가-힣]+$/
const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 10

interface CheckEmailPatternProps {
  email: string
}

interface CheckNamePatternProps {
  name: string
}

export const checkEmailPattern = ({ email }: CheckEmailPatternProps) => {
  const trimmedEmail = email.trim()

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    return '유효한 이메일 주소가 아니야!'
  } else {
    return ''
  }
}

export const checkNamePattern = ({ name }: CheckNamePatternProps) => {
  const trimmedName = name.trim()

  if (
    !NAME_REGEXP.test(trimmedName) ||
    trimmedName.length < NAME_MIN_LENGTH ||
    trimmedName.length > NAME_MAX_LENGTH
  ) {
    return '3 ~ 10자의 문자 또는 숫자로 만들라구!'
  } else {
    return ''
  }
}
