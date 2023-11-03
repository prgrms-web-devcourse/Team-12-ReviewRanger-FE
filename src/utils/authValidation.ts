const EMAIL_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

interface CheckEmailPatternProps {
  email: string
}

export const checkEmailPattern = ({ email }: CheckEmailPatternProps) => {
  const trimmedEmail = email.trim()

  if (!EMAIL_REGEXP.test(trimmedEmail)) {
    return '유효한 이메일 주소가 아니야!'
  } else {
    return ''
  }
}
